//---Importation du models de la BDD---
const FicheUser = require("../models/FicheUser")

const {readAllFicheUserQuery,
        readOneFicheUserQuery,
        findByIdAndDeleteQuery }
        = require("../queries/ficheUsersQueries");

//---Importation du module fs de node.js pour accéder aux fichiers du Server---
const fs = require("fs");
// const mysqlconnection = require("../config/db.mysql");

exports.createFicheUser = async (req, res) => {
    //Pas besoin d'utiliser un JSON.parse() pour req.body.ficheUser
    const userFicheObject = JSON.parse(req.body.ficheUser);

    //Instance FicheUser - Les variables
    const {userId, nom, prenom, age} = userFicheObject;
    const photoProfilUrl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
    }`;

   //Instance
    const ficheUser = new FicheUser(userId, nom, prenom, age, photoProfilUrl);

    //Enregistrer l'objet dans la BDD
    /*
    INSERT INTO `fiche_user`(`fiche_user_userId`, `fiche_user_nom`, `fiche_user_prenom`, `fiche_user_age`, `fiche_user_photoProfilUrl`) 
    VALUES (6,'gabio','amelie',12,'qsdf')
    */
    try {
        const querySql = `
        INSERT INTO fiche_user(fiche_user_userId, fiche_user_nom, fiche_user_prenom, fiche_user_age, fiche_user_photoProfilUrl) 
        VALUES (?)
        `;
        const values = [userId, nom, prenom, age, photoProfilUrl];
        const ficheUser = await mysqlconnection.query(
            querySql,
            [values],
            (error, results) => {
                if(error){
                    res.json({error});
                } else {
                    res.status(200).json({results});
                  }
            }
        );
    } catch(err) {  
        res.status(500).json({error : err});
      }
};

//---ECMAScript 2017---
exports.readAllFicheUser = async (req, res) => {
    try {
        const ficheUser = await mysqlconnection.query(
            "SELECT * FROM `fiche_user` WHERE ?",
             ["1"],
            (error, results) => {
                if(error) {
                    res.json({error});
                } else {
                    res.status(200).json({results})
                }  
            }
        );
    } catch(err) {
        res.status(500).json({error : err});
      }
};

//---ECMAScript 2017---
exports.readOneFicheUser = async (req, res) => {
    try {
        const id = req.originalUrl.split("-")[1];
      //  const id = req.params.id;
        const querySql = "SELECT * FROM fiche_user WHERE id_fiche_user = ?";
        const ficheUser = await mysqlconnection.query(
            querySql, 
            [id],
            (error, results) => {
                if(error) {
                    res.json({error});
                } else {
                    res.status(200).json({ results });
                  }
            }
        );
    } catch (error) {
        res.status(500).json({error});
      }
};

exports.updateOneFicheUser = async (req,res) => {
    //Aller chercher l'objet dans la table ficheUser
    try {
     const id = req.params.id;
     //SELECT * FROM `fiche_user` WHERE `id_fiche_user` = 2
     const querySql = "SELECT * FROM fiche_user WHERE id_fiche_user = ?";
     const ficheUser = await mysqlconnection.query(
        querySql, 
        [id],
        (error, results) => {
            if(error) {
                res.json({error});
            } else {
                //Contrôle autorisation de la modification par l'userId
                console.log("userIdParamsUrl et fiche_user_userId");
                console.log(userIdParamsUrl);
                console.log(results[0].fiche_user_userId);

                if(userIdParamsUrl == results[0].fiche_user_userId) {
                    console.log("Authorisation pour modification de l'objet");
                //S'il y a un fichier attaché à modifier
                if(req.file) {
                    //Récuperation du nom de la photo à supprimer dans la BDD
                    const filename = results[0].fiche_user_photoProfilUrl.split(
                        "/images"
                        )[1];  
                    //Supression de l'image dans le dossier images du Server
                    fs.unlink(`images/${filename}`, (error) => {
                        if(error) throw error;
                    });
                }
                    //Objet qui sera mis à jour dans la BDD
                    const userFicheObject = JSON.parse(req.body.ficheUser);

                    //Création des variables qui seront utilisés pour l'envoi dans MySQL
                      //2 cas possibles avec & sans fichier image
                       const ficheUserObject = req.file ? {
                        ...JSON.parse(req.body.ficheUser),
                            photoProfilUrl: `${req.protocol}://${req.get("host")}/images/${
                                req.file.filename
                            }`,
                       } 
                       : {
                        ...JSON.parse(req.body.ficheUser)
                       };

                    //Mettre à jour la BDD
                       /*
                        Requête SQL pour phpMyAdmin
                        UPDATE 
                            `fiche_user` 
                        SET 
                            `fiche_user_nom`='DOE',
                            `fiche_user_prenom`='John',
                            `fiche_user_age`= 43,
                            `fiche_user_photoProfilUrl`='ghjkl' 
                        WHERE 
                            `id_fiche_user`= 4
                    */      
                       const { userId, nom, prenom, age, photoProfilUrl } = ficheUserObject;
                       const querySql = req.file
                       ? `
                       UPDATE fiche_user SET 
                        fiche_user_nom = ?,
                        fiche_user_prenom = ?,
                        fiche_user_age = ?,
                        fiche_user_photoProfilUrl = ? 
                        WHERE id_fiche_user = ?
                       `
                       :`
                       UPDATE fiche_user SET 
                       fiche_user_nom = ?,
                        fiche_user_prenom = ?,
                        fiche_user_age = ?
                       WHERE id_fiche_user = ?
                      `;

                       const values = req.file
                       ? [ nom, prenom, age, photoProfilUrl, id ]
                       : [ nom, prenom, age, id ]
                       console.log(values);

                       mysqlconnection.query(querySql, values, (error, results) => {
                            if(error) {
                                res.staus(500).json({error});
                            } else {
                                res.staus(201).json({message : "Mise à jour OK dans la Base de données", 
                                results,
                            });
                              }
                       });
                } else {
                    console.log("userId different de l'userId ds l'objet - pas autorisé à faire la modif");
                    // throw
                    res.status(403).json({message : "Vous n'êtes pas autorisé à modifier les données"});
               }
            }
        } 
     );

    } catch(error) {
        res.status(500).json({error});
    }
};

//---ECMAScript 2017---
exports.deleteOneFicheUser = async (req,res) => {
        //Chercher le doc 
        try {
            //Aller chercher l'id de l'objet à supprimer dans la requête
            const id = req.params.id;
            const querySql = "SELECT * FROM fiche_user WHERE id_fiche_user = ?";
                await mysqlconnection.query(
                    querySql, 
                    [id],
                    (error, results) => {
                        if(error) {
                            res.json({error}); 
                        } else {
                            console.log("--->récupérer la data de BDD pour controler la validité de l'userId");
                            console.log(results);

                    //Contrôle de l'existance de la donnée dans la BDD pour éviter le crash du Server
                    if(results != 0) {
                        console.log("Présence objet dans BDD");
                    } else {
                        console.log("Objet non présent dans BDD");
                        return res.status(404).json({message : "Pas d'objet à supprimer dans la Base de données"})
                      }
                    //Contrôle autorisation de la modification par l'userId
                    console.log("userIdParamsUrl et fiche_user_userId");
                    console.log(userIdParamsUrl);
                    console.log(results[0].fiche_user_userId);

                    if(userIdParamsUrl == results[0].fiche_user_userId) {
                        console.log("Autorisation pour suppression de l'objet"); 
                
                        //Récuperation du nom de la photo à supprimer dans la BDD
                        const filename = results[0].fiche_user_photoProfilUrl.split(
                            "/images"
                            )[1];  
                        //Supression de l'image dans le dossier images du server
                        fs.unlink(`images/${filename}`, (error) => {
                            if(error) throw error;
                        });
                  
                        //Mise à jour de la BDD - Requête PhpMyAmin pour supprimer la data / DELETE FROM `fiche_user` WHERE `id_fiche_user` = 4
                        const querySql = `
                        DELETE FROM fiche_user
                        WHERE id_fiche_user = ?
                        `;

                        const values = [id];

                        //Connexion à la BDD
                        mysqlconnection.query(querySql, values, (error, results) => {
                            if(error) {
                                res.staus(500).json({error});
                            } else {
                                res.staus(201).json({
                                    message : "objet effacé dans la Base de données",
                                    results,
                                });
                              }
                    });
  
                } else {
                    console.log("Pas autorisé");
                    res
                      .status(403)
                      .json({
                        message : "Vous n'êtes pas autorisé à modifier les données",
                      });
                  }
                } 
                });
        }  catch(error) {  
                res.status(500).json({
                    error: error,
                    message: "Image inexistante"});
            } 
};
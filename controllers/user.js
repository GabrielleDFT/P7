//---Importation de bcrypt pour hasher le password--- 
const bcrypt = require("bcrypt");

//---Importation de crypto-js pour chiffrer le mail--- 
const cryptojs = require("crypto-js");

//---Importation de jsonwebtoken 
const jwt = require("jsonwebtoken");

//---Importation pour utilisation des variables d'environnements--- 
const dotenv = require("dotenv");
const result = dotenv.config();

//---Importation models de la DataBase user.js--- 
const User = require("../models/User");

//---Importation mysqlConnection--- 
const mysqlconnection = require("../config/db.mysql");

//---Signup pour enregistrer le nouvel User dans la BDD---
exports.signup = (req, res) => {
    const { email, password } = req.body;
 
    //Instance de la class User
    const user = new User(email, password);

    //Chiffrer l'email avant de l'envoyer dans la BDD
    const emailChiffre =  user.emailChiffrement();

    //Hasher le Password avant de l'envoyer dans la BDD
     user.hashPassword()
     .then((hash) => {
         //Données à envoyer dans la requete SQL pour la table user
          const data = {
            email: emailChiffre,
            password: hash
          }
        //Requête SQL pour envoyer les données dans la Table user
          mysqlconnection.query(
          'INSERT INTO user SET ?', 
          data,
          (error, results) => {
            if(error) {
                console.log(error);
                res.json({error});
            } else {
                console.log("-->results");
                console.log(results);
                res.json({message: "Utilisateur enregistré !"});
              }
          }
          );   
    }) 
     .catch((error) => res.status(500).json({ error }.send(console.log(error))));
};

//---Login pour s'authentifier---
exports.login = (req, res, next) => {
    //Contenu de la requête
    const { email, password } = req.body;

    //Instance de la class User
    const user =  new User(email, password);

    //Chiffrer l'Email de la requête
    const emailChiffre = user.emailChiffrement();

    //Chercher dans la BDD si l'user est bien présent
    mysqlconnection.query(
     "SELECT * FROM user WHERE email = ? ", 
     emailChiffre, (error, results) => {
    if(error) {
        res.json({error});
    } else {
         //Si l'email de l'user n'est pas présent dans la BDD
         if(results == 0) {
            return res.status(404)
            .json({error: 'Utilisateur inexistant dans la base de données'});
         }
        //Contrôler la validité du password envoyé par le front
          bcrypt
            .compare(req.body.password, results[0].password)
            .then((controlPassword) => {
                //Si le password est Incorrect
                if(!controlPassword) {
                    return res.status(401).json({ error: "Le mot de passe est incorrect"});
                }
                //Si le password est Correct - envoi dans la reponse du Server :  userId et le token d'authentification JWT

                //Génération du Token JWT
                const token = jwt.sign(
                    //3 arguments
                    {userId:results[0].id },
                    `${process.env.JWT_KEY_TOKEN}`,
                    { expiresIn: "12h" }
                )
                //Réponse du server avec le userId et le token
                res.status(201).json({
                userId: results[0].id,
                token, 
                });
            })
            .catch((error) => res.status(500).json({error}));
      }
}
);
};


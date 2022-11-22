//---Importation du models de la DataBase---
const FicheUser = require("../models/FicheUser")

exports.likeFicheUser = (req, res, next) => {
        //Affichage req.body
        /*la req sera envoyé par body--> raw en format JSOn avec ces 2 propriétés
         {
//     "userId : "600d2a68b91b5b6bb045cca5",
//     "like" : -1
// }
// */
//Récupérer l'id dans l'url de la requête
console.log("-->CONTENU req.params - crtl like");
console.log(req.body.params);

//Mise au format de l'id pr aller chercher l'objet correspondant dans la BDD
console.log("-->id en _id");
console.log({_id : req.params.id});

// Aller chercher l'objet ds la BDD
FicheUser
    .findOne({_id : req.params.id})
    .then((objet) => {
     //Like = 1 (Likes = +1)
//-->utilisation de la méthode js includes()
//-->utilisation de l'opérateur $inc (au niveau de MongoDB)
//-->utilisation de l'opérateur $push (au niveau de MongoDB)
//-->utilisation de l'opérateur $pull (au niveau de MongoDB)

// Mise en place d'1 switch case(-)
 switch(req.body.like) {
    case 1 :
      //Si le userId est FALSE & Si like === 1
      if(!objet.usersLiked.includes(req.body.userId) && req.body.like === 1) {
         console.log("");
 
      // Mise à jour objet BDD MongoDB
      FicheUser.updateOne(
        {_id : req.params.id},
        {
          $inc:{ likes: 1 },
          $push:{ usersLiked: req.body.userId },
        }
      )
        .then(() => res.status(201).json({message: "FicheUser like +1"}))
        .catch((error) => res.status(400).json({error}));
      }
    break;

    case -1 : 
      //Like = -1 (Dislikes = +1)
      if(!objet.usersDisliked.includes(req.body.userId) && 
        req.body.like === -1) {
        console.log("-->userId est ds userDisliked & Dislikes = 1");

      //Mise à jour objet BDD MongoDB
      FicheUser.updateOne(
        {_id : req.params.id},
        {
          $inc:{ dislikes: 1 },
         $push:{ usersDisliked: req.body.userId }
        }
      )
        .then(() => res.status(201).json({message: "FicheUser dislike +1"}))
        .catch((error) => res.status(400).json({error}));
      }
    break;

    case 0 :
      //Like = 0 (Likes = 0, pas de vote)
      if(objet.usersLiked.includes(req.body.userId)) {
       console.log("-->userId est ds userLiked & case = 0");

      //Mise à jour objet BDD MongoDB
      FicheUser.updateOne(
        {_id : req.params.id},
        {
          $inc:{ likes: -1 },
          $pull:{ usersLiked: req.body.userId },
        }
      )
        .then(() => res.status(201).json({message: "FicheUser like 0"}))
        .catch((error) => res.status(400).json({error}));
      }

      //Après un like = -1 on met un Like = 0 (Likes = 0, pas de vote, on enleve le dislike)
      if(objet.usersDisliked.includes(req.body.userId)) {
       console.log("-->userId est dans userDisliked & like = 0");

        //Mise à jour objet BDD MongoDB
        FicheUser.updateOne(
            {_id : req.params.id},
            {
              $inc:{ dislikes: -1 },
              $pull:{ usersDisliked: req.body.userId },
            }
        )
            .then(() => res.status(201).json({message: "FicheUser dislike 0"}))
            .catch((error) => res.status(400).json({error}));
    };
    break;
 }
 })
    .catch((error) =>res.status(404).json({error}));

   //Like = 0 (Dislikes = 0)
};
//----------------------------------------GESTION USERS (+ user.routes)-----------------------------------------------

const UserModel = require("../models/user.model");

//---Controler des id reconnus par la BDD---
const ObjectID = require("mongoose").Types.ObjectId;

//---Sélection des Infos de tous les Users (fonction déclarée dans user.routes)---
module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");//---Ne selectionne pas les passwords---
  res.status(200).json(users);
};

//---Sélection des Infos d'un User---
module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))//---Test si l'id est connu dans BDD---
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {//docs = data
    if (!err) res.send(docs);//---Envoi la data si pas d'erreur dans BDD---
    else console.log("ID unknown : " + err);
  }).select("-password");//---On ne voit tjrs pas le password---
};

//---Mise à jour Data User---
module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  if (req.params.id === req.auth || req.admin === true) {//---verification droits admin---

    UserModel.findOneAndUpdate(
        { _id: req.params.id },
        { ...userObject, $set: { bio: req.body.bio, } },
        { new: true, upsert: true, setDefaultsOnInsert: true })

        .then((data) => res.send(data))
        .catch((err) => res.status(500).send({ message: err }));

  } else {
    return res.status(500).json({ message: err });
  }
};

//---Suppression User---
module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    UserModel.findOne({ _id: req.params.id })
    .then(user => {

        if (req.params.id === req.auth || req.admin === true) {//---verification droits admin---

        const filename = user.imageUrl.split('/uploads/profil/')[1]
        fs.unlink(`/uploads/profil/${filename}`, () => {
            UserModel.deleteOne({_id: req.params.id})
            .then(() => { res.status(200).json({message: "Compte supprimé !"})})
            .catch(error => res.status(401).json({ message : "Non-authorisé 2" }));
        })

  } else {
    return res.status(500).json({ message: err });
  }
})
.catch(error => res.status(500).json({ error }));
}

//---Mise à jour des Follows---
module.exports.follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||//Vérification id ou
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    //---Add to Followers list---
    await UserModel.findOneAndUpdate(
      {_id: req.params.id},
      { $addToSet: { following: req.body.idToFollow } }//---Rajoute 1 element à la data 
      )
      //---Add to Following list---
      await UserModel.findOneAndUpdate(
        req.body.idToFollow,
        { $addToSet: { followers: req.params.id } })
          .then((data) => res.send(data))
         
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

//---Mise à jour des Unfollows---
module.exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  )
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    await UserModel.findOneAndUpdate(
      {_id: req.params.id},
      { $pull: { following: req.body.idToUnfollow } })

      //---Remove to Followers list---
      await UserModel.findOneAndUpdate(
        req.body.idToUnfollow,
        { $pull: { followers: req.params.id } })
          .then((data) => res.send(data))
        
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}


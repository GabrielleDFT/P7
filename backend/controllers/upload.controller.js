//----------------------------------------GESTION UPLOADS D'IMAGES---------------------------------------

const UserModel = require("../models/user.model");
const fs = require("fs");//---Création de fichiers (incrémente éléments ds fichiers)---
const { uploadErrors } = require("../utils/errors.utils");
const sharp = require("sharp");

//---Upload image profil utilisateur---
module.exports.uploadProfil = async (req, res) => {
 
  //---Renomme le fichier avec extension .jpg---
  const fileName = req.body.name +".jpg"; 
  try {
    if (//---Format autorisés des images---
      req.file.mimetype != "image/jpg" &&
      req.file.mimetype != "image/png" &&
      req.file.mimetype != "image/jpeg"
    )
      throw Error("invalid file");

    if (req.file.size > 500000) throw Error("max size");//---Size autorisé des images---
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }

  try {//---Upload, Resize & stock new image avec Sharp---
    await sharp(req.file.buffer)
      .resize({ width: 150, height: 150 }) 
      .toFile(`${__dirname}/../frontend/public/uploads/profil/${fileName}`//chemin où seront stockés les images
      );
    res.status(201).send("Photo de profil chargée avec succés");
  } catch (err) {
    res.status(400).send(err);
  }
}




            //Multer = pour gérer les requêtes HTTP avec envoi de fichiers

const multer = require("multer");

//---Dictionnaire des MIME TYPES---
const MIME_TYPES = {
    "image/jpg" : "jpg",
    "image/jpeg" : "jpg",
    "image/gif" : "gif",
    "image/png" : "png"
};

//---Destination du fichier & générer un nom de fichier unique---
const storage = multer.diskStorage({
    //Destination de stockage du fichier
    destination : (req, file, callback) => {
        callback(null, "images");
    },
    filename : (req, file, callback) => {
      //Suppression des espaces dans le nom du fichier
      const name = file.originalname.split(" ").join("_");
      const extension = MIME_TYPES[file.mimetype];

      //Callback(null, name + "_" + Date.now() + "." + extension);
      callback (null, `${name}_${Date.now()}.${extension}`);
    }
})

//---Exportation du middleware multer---
module.exports = multer({storage}).single("image");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

//---Exportation de la fontion du middleware---
module.exports = (req,res,next) => {
    try {
        //Récupérer le Token dans le headers authorization : bearer token
        const token = req.headers.authorization.split(" ")[1];

        //Décoder le Token
        const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`);

        //Récupérer le userId dans le Token déchiffré & le comparer avec l'userId en clair
        const userIdDecodedToken = decodedToken.userId;

        userParamsUrl = req.originalUrl.split("_")[1];

        //Comparaison du userId qu'il y a en clair dans le req avec le userId qu'il y a dans le Token
            if(userIdParamsUrl == userIdDecodedToken) {
                next();
            } else {
                throw "Erreur identification : userId incorrect"
              }

        //S'il y a des erreurs dans le try, on les récupère ici
    }   catch(error) {
            res.status(401).json({
            message : "Echec Authentification",
            error:  error
            });
        }
};

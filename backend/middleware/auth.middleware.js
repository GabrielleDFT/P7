//----------------------------------------GESTION NAVIGATION USER/CONTROLE TOKEN D'AUTHENTIFICATION-----------

const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

//---Teste si User connecté pdt la navigation du site : Check le Token de l'User pour voir s'il est connu---
module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {//---Vérification/Decoded Token---
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        res.auth = decodedToken.id;
        res.admin = user.admin;//Check User
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

//---Controle Authentification - si Token correspond à la BDD
module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json('no token')
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log('No token');
  }
};

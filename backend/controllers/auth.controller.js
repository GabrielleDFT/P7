//----------------------------------------GESTION AUTHENTIFICATION USER--------------------------------------------------

const UserModel = require('../models/user.model');

//---Bibliotheque Jwt---
const jwt = require('jsonwebtoken');

const { signUpErrors, signInErrors } = require('../utils/errors.utils');

//---Calcul du Temps/Durée de validité du Token : 3 journées---
const maxAge = 3 * 24 * 60 * 60 * 1000;
//---Fonction CreateToken---
const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge 
  })
};

//---Inscription---
module.exports.signUp = async (req, res) => {
  const {pseudo, email, password} = req.body

  try {//---Création d'un nouvel utilisateur---
    const user = await UserModel.create({pseudo, email, password });
    res.status(201).json({ user: user._id});
  }
  catch(err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors })
  }
}

//---Connexion---
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await UserModel.login(email, password);
    //---Creation Token---
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge});//---Création Cookie - httpOnly : Sécurité du Token---
    res.status(200).json({ user: user._id})
  } catch (err){
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
}

//---Deconnexion---
module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });//---Retirer Cookie & Token---
  res.redirect('/');//Redirection pr faire aboutir la requête
}

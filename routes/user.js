const express = require("express");

//---Importation du Middleware password---
const password = require("../middleware/password");

const controleEmail = require ("../middleware/controleEmail");

//---Importation du Controllers/user.js---
const {signup, login} = require("../controllers/user");

//---Fonction Router()---
const router = express.Router();

//---Route (endpoint) Signup---
router.post("/signup", controleEmail, password, signup);

//---Route (endpoint) Login---
router.post("/login", login);

module.exports = router;

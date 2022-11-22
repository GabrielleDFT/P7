//---Importation d'express---
const express = require("express");

//---Importation du controllers/user.js---
const {
    createFicheUser, 
    readAllFicheUser, 
    readOneFicheUser, 
    updateOneFicheUser, 
    deleteOneFicheUser
    } = require("../controllers/ficheUser");

//---Importation du controllers/like.js---
const like = require("../controllers/like");

//---Importation du middleware d'authentification---
const authentification = require("../middleware/authentification");

//---Importation du middleware multer pour la gestion du fichier images---
const multer = require("../middleware/multer");

//---Fonction Router()---
const router = express.Router();

//---Routes---
router.post("/", authentification, multer, createFicheUser);
router.get("/", authentification, readAllFicheUser);
router.get("/fiche/", authentification, readOneFicheUser);
router.put("/:id", authentification, multer, updateOneFicheUser);
router.delete("/:id", authentification, deleteOneFicheUser);
router.post("/:id/like", authentification, like.likeFicheUser);

module.exports = router;
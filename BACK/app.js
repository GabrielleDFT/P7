//---Importation d'express---
const express = require("express");

//---Importation de Morgan - logger http---
const morgan = require("morgan");

//---Importation Connexion BDD MySql---
const mysql = require("./config/db.MySQL");

//---Importation des Routes---
const userRoutes = require("./routes/user");
const ficheUserRoutes = require("./routes/ficheUser");

//---Importation Node.js Utilisataires pour travailler avec les chemins de fichiers & de repertoires---
const path = require('path');

//---Pour Créer une application Express---
const app = express();

//---Logger les requests & les responses---
app.use(morgan("dev"));

//---Gérer les problèmes de CORS---
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Alow-Header",
        "Origin, x-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Alow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

//---Transformer le Body en JSON Objet JavaScript utilisable req.body---
app.use(express.json());

//---Route d'Authentification---
app.use("/api/authentification", userRoutes);

//---Route Fiche User---
app.use("/api/fiche_user", ficheUserRoutes);

//---Pour accéder aux images du dossier images---
app.use("/images", express.static(path.join(__dirname, "images")));

//---Exportation de app.js pour pouvoir y accéder depuis 1 autre fichier---
module.exports = app;




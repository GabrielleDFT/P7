//----------------------------------------CONNEXION AU SERVER / MONGO_DB--------------------------------------------------

//---Frameworks---
const express = require('express');

//---Bibliotheque BodyParser permet lecture/traitement de la data---
const bodyParser = require('body-parser');

//---Bibliotheque pour Lire/Décoder un Cookie avec Node js---
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

//---Variables d'environnement - Dotenv Library---
require('dotenv').config({path: './config/.env'});
require('./config/db');//---Relié à MongoDB viA db.js---

//---Appel du Middlewared'Authentification---
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require('cors');

//---Création application Express---
const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));

//---Traitement des Requêtes - Convertion JSON---
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//---Traitement des Cookies---
app.use(cookieParser());

//---Sécurité de la connexion de l'User - Check Token avec l'id User---
app.get('*', checkUser);

//---Jwt - Middleware authentification à la connexion de l'User---
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});

//---Routes---
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

//---Ecoute du Server sur le Port---
app.listen(process.env.PORT, () => {
  console.log(`Succesfully Listening on Port ${process.env.PORT}`);
})

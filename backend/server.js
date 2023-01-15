//----------------------------------------CONNEXION AU SERVER / MONGO_DB--------------------------------------------------

//---Frameworks---
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

//---Variables d'environnement - Dotenv Library---
require('dotenv').config({path: './config/.env'});
require('./config/db');//---Relié à MongoDB vi db.js---

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//---Jwt--Token avec l'id utilisateur---
app.get('*', checkUser);
//---Middleware authentification de l'utilisateur à la connexion--
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

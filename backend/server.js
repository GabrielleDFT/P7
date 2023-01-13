//--Framework node.js--
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

//--Variables d'environnement--
require('dotenv').config({path: './config/.env'});
require('./config/db');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require('cors');

//--Creation application express--
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

//--Jwt--Token avec l'id utilisateur - Tous les get passe par checkUser qui vérifie l'id de l'utilisateur pour donner accès
app.get('*', checkUser);
//Middleware pour l'authentification de l'utilisateur à la connexion
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});

//--Routes--
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

//--Server--
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
})
//---Importer le package HTTP de Node.js pr avoir les outils pour créer le Server---
 const http = require("http");

//---Importer l'application app.js---
const app = require("./app");

//---Importer package pour utiliser les variables d'environnement---
const dotenv = require("dotenv");
const result = dotenv.config();

//---Paramétrage du Port avec méthode set d'Express---
app.set("port", process.env.PORT);

//---La méthode createServer() prend en argument la fonction qui sera appelé à chaque requête reçue par le server
    //ici les fonctions seront dans app.js
const server = http.createServer(app);

//---Le Server écoute les Requêtes sur le Port---
server.listen(process.env.PORT,
    console.log(`Listening on port : ${process.env.PORT}`));

    



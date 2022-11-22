//---Importer le package pour utiliser les variables d'environnement---
const dotenv = require("dotenv");
dotenv.config();

//---Importer MySQL---
const mysql = require("mysql");

//---Paramêtres de Connexion à la BDD---
const mysqlconnection = mysql.createConnection({
    host:'localhost',
    database:'reseau_social_groupomania',
    user:'root',
    paswword:''
})

//---Connexion à la BDD---
mysqlconnection.connect((err) =>{
    if(err) {
        console.log(`Error Connecting : ${err}`);
    } else {
        console.log(`Successfully connected to MySQL DataBase ! - Reseau_social_Groupomania `);
        console.log(`Connected as id ${mysqlconnection.threadId}`);
      }
})

module.exports = mysqlconnection;

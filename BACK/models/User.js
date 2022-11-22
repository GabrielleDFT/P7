//---Importation de crypto-js pour chiffrer l'Email---
const cryptojs = require("crypto-js");

//---Importation de bcrypt pour Hasher le Password---
const bcrypt = require("bcrypt");

//---Importation pour utilisation des variables d'environnements--- 
const dotenv = require("dotenv");
const result = dotenv.config();

class User {
    constructor (email, password) {
        this.email = email;
        this.password = password;
    }
    //Méthode pr chiffrer & déchiffrer l'email
    emailChiffrement() {
        const emailCryptoJs = cryptojs
        .HmacSHA256(this.email, `${process.env.CRYPTOJS_EMAIL}`)
        .toString();
        return emailCryptoJs;
    }
    //Méthode pour Hasher le Password
    hashPassword = async function() {
        try {
        const hashPassword = bcrypt.hash(this.password, 10);
        return hashPassword;
        } catch(err) {
            console.log(err);
          }
    };
}

module.exports = User;

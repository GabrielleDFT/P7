//---Importation de password-validator---
const passwordValidator = require("password-validator");

//---Création du Schéma---
const passwordSchema = new passwordValidator();

//---Schéma que doit respecter le Password---
passwordSchema
.is().min(5)
.is().max(100)
.has().uppercase()
.has().lowercase()
.has().digits(2)
.has().not().spaces()
.is().not().oneOf(['Passw0rd', 'Password123']);

//---Vérification de qualité du Password par rapport au Schéma---
 module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)) {
        next();
    }
    else {
        return res
        .status(400)
        .json({error : `Le mot de passe n'est pas assez fort ${passwordSchema.validate('req.body.password', { list: true })}`})
    }
}

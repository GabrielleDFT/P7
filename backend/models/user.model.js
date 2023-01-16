//----------------------------------------MODELE USERS + COMPTE ADMIN DANS MONGO_DB--------------------------------------------------

const mongoose = require('mongoose');
//---Bibliotheque Validator pr validation d'email - Fonction (renvoie true ou false) similaire à Regex, qui controle l'email
const { isEmail } = require('validator');

//---Bibliotheque Bcrypt pour crypter password
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,//---Nom unique---
      trim: true //---Spprime les espaces---
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],//---Validation/vérification précise de l'email---
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {//---Le password sera crypté---
      type: String,
      required: true,
      max: 1024,
      minlength: 6
    },
    picture: {//---Photo de profil---
      type: String,
      default: "./uploads/profil/random-user.png"//---Image par défault lors de la création d'un compte User---
    },
    bio :{//---Intitulé de poste---
      type: String,
      max: 1024,
    },
    followers: {//---Collègues qui suivent l'user---
      type: [String]
    },
    following: {//---Collègues que l'user suit---
      type: [String]
    },
    likes: {//---Posts déjà likés par l'user & qu'il ne peut reliker (pas de likes à l'infini)---
      type: [String]
    },
    // ---Création Compte Administrateur---
    admin: {
       type: Boolean,
      default: false,
      // allowNull: false,
      required: true
    },
  },
  {//---A chaque fois que l'user va s'enregistrer---
    timestamps: true,
  }
);

//---Password hashé avant sauvegarde dans MongoDB avec Bcrypt + Salt---
userSchema.pre("save", async function(next) {//---Crypter le password avant d'enregistrer dans BDD---
  const salt = await bcrypt.genSalt();//---Salage du password---
  this.password = await bcrypt.hash(this.password, salt);//---Ajouter le salage au password---
  next();
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Incorrect password');
  }
  throw Error('Incorrect email')
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;

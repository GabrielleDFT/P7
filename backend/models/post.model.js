//----------------------------------------MODELE POSTS DANS MONGO_DB--------------------------------------------------

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    posterId: {//---L'id de l'user qui poste---
      type: String,
      required: true
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    picture: {
      type: String,
    },
    video: {
      type: String,
    },
    likers: {//---Users ayant liké le post---
      type: [String],
      required: true,
    },
    comments: {
      type: [//---Data du commenter---
        {
          commenterId:String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        }
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('post', PostSchema);

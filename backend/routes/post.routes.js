//----------------------------------------GESTION ROUTES POSTS-----------------------------------------------

const router = require('express').Router();
//---Controller---
const postController = require('../controllers/post.controller');

/*------------Middlewares*/
const auth = require('../middleware/auth.middleware') /*Calls the Auth middleware*/
const {checkUser, requireAuth} = require('../middleware/auth');
const multer = require('../middleware/multer.middleware') /*Calls the Multer middleware*/

//---Traitement des Images---
const multer = require("multer");
const upload = multer();

//---Routes (CRUD) Posts---
router.get('/', checkUser, postController.readPost);
router.post('/', checkUser, upload.single("file"), postController.createPost);
router.put('/:id', checkUser, postController.updatePost);
router.delete('/:id', checkUser, postController.deletePost);

//---Routes Likes & Unlikes---
router.patch('/like-post/:id', checkUser, postController.likePost);
router.patch('/unlike-post/:id', checkUser, postController.unlikePost);

//---Routes Commentaires---
router.patch('/comment-post/:id', checkUser, postController.commentPost);
router.patch('/edit-comment-post/:id', checkUser, postController.editCommentPost);
router.patch('/delete-comment-post/:id', checkUser, postController.deleteCommentPost);

module.exports = router;

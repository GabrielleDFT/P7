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
router.get('/', requireAuth, postController.readPost);
router.post('/', requireAuth, upload.single("file"), postController.createPost);
router.put('/:id', requireAuth, postController.updatePost);
router.delete('/:id', requireAuth, postController.deletePost);

//---Routes Likes & Unlikes---
router.patch('/like-post/:id', requireAuth, postController.likePost);
router.patch('/unlike-post/:id', requireAuth, postController.unlikePost);

//---Routes Commentaires---
router.patch('/comment-post/:id', requireAuth, postController.commentPost);
router.patch('/edit-comment-post/:id', requireAuth, postController.editCommentPost);
router.patch('/delete-comment-post/:id', requireAuth, postController.deleteCommentPost);

module.exports = router;

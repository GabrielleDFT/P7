//----------------------------------------GESTION ROUTES USERS-----------------------------------------------

//---Module Router d'Express---
const router = require("express").Router();

/*------------Middlewares*/
const auth = require('../middleware/auth.middleware') /*Calls the Auth middleware*/
const {checkUser, requireAuth} = require('../middleware/auth');
const multer = require('../middleware/multer.middleware') /*Calls the Multer middleware*/

//---Routes Controllers---
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require('../controllers/upload.controller');

//---Traitement des Images---
const multer = require("multer");
const upload = multer();

//---Routes Authentification---
router.post("/register", checkUser, authController.signUp);
router.post("/login", checkUser, authController.signIn);
router.get("/logout", checkUser, authController.logout);

//---Routes Users DB---
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", checkUser, userController.updateUser);
router.delete("/:id", checkUser, userController.deleteUser);

//---Routes Follow & Unfollow---
router.patch("/follow/:id",  checkUser, userController.follow);
router.patch("/unfollow/:id",  checkUser, userController.unfollow);

//---Route Upload---
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;



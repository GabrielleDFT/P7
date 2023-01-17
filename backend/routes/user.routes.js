//----------------------------------------GESTION ROUTES USERS-----------------------------------------------

//---Module Router d'Express---
const router = require("express").Router();

/*------------Middlewares*/
const auth = require('../middlewares/auth.middleware') /*Calls the Auth middleware*/
const multer = require('../middlewares/multer.middleware') /*Calls the Multer middleware*/

//---Routes Controllers---
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require('../controllers/upload.controller');

//---Traitement des Images---
const multer = require("multer");
const upload = multer();

//---Routes Authentification---
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//---Routes Users DB---
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

//---Routes Follow & Unfollow---
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

//---Route Upload---
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;



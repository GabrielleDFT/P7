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
router.post("/register", requireAuth, authController.signUp);
router.post("/login", requireAuth, authController.signIn);
router.get("/logout", requireAuth, authController.logout);

//---Routes Users DB---
router.get("/", requireAuth, userController.getAllUsers);
router.get("/:id", requireAuth, userController.userInfo);
router.put("/:id", requireAuth, userController.updateUser);
router.delete("/:id", requireAuth, userController.deleteUser);

//---Routes Follow & Unfollow---
router.patch("/follow/:id",  requireAuth, userController.follow);
router.patch("/unfollow/:id",  requireAuth, userController.unfollow);

//---Route Upload---
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;



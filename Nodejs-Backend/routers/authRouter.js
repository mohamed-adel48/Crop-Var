const authController = require("../controllers/authController");
const router=require("express").Router();
router.route('/login').post(authController.login);
router.use(authController.isLoggedIn);
router.route("/create").post(authController.createAdmin);
module.exports=router;
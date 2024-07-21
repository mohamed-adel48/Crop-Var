const authController = require("../controllers/authController");
const analyticsController = require("../controllers/analyticsController");
const router = require("express").Router();
router.use(authController.isLoggedIn);
router.route("/top").get(analyticsController.getTopData);
module.exports = router;
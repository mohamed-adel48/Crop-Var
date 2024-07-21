const authController = require("../controllers/authController");
const predictionController = require("../controllers/predictionController");
const router = require("express").Router();
router.use(authController.isLoggedIn);
router.route("/").post(predictionController.predictLocation);
router.route("/all").get(predictionController.predictAll);
module.exports = router;
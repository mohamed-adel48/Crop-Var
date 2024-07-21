const FarmLocationController = require("../controllers/farmLocationController");
const authController = require("../controllers/authController");
const router = require("express").Router();
router.use(authController.isLoggedIn);
router.route("/").get(FarmLocationController.getLocations);
router.route("/farmer/:id").post(FarmLocationController.getUserLocations);
router.route("/:id").get(FarmLocationController.getLocationById);
module.exports = router;
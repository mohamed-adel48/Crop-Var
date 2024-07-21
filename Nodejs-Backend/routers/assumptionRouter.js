const authController = require("../controllers/authController");
const assumptionController = require("../controllers/assumptionController");
const farmLocationController  = require("../controllers/farmLocationController");
const router = require("express").Router();
router.use(authController.isLoggedIn);
router.route("/user/:id").get(assumptionController.getAssumptionByUserId);
router.route("/").post(farmLocationController.createFarmLocation,farmLocationController.createLatLongs,assumptionController.plantingLocation).get(assumptionController.getAssumptions);
router.route("/:id").get(assumptionController.getAssumptionById).delete(assumptionController.deleteAssumption).post(assumptionController.editAssumption);
module.exports = router;
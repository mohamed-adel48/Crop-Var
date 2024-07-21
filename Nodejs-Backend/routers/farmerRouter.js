const authController = require("../controllers/authController");
const farmerController = require("../controllers/farmerController");
const router = require("express").Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage()});
const uploadController = require("../controllers/uploadController");
router.use(authController.isLoggedIn);
router.route("/").post(upload.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'farmerCard', maxCount: 1 }
  ]),uploadController.uploadFilesDrive,farmerController.createFarmer).get(farmerController.getFarmers);
router.route("warnings/:id").post(farmerController.sendWarning);
router.route("/:id").get(farmerController.getFarmer).patch(farmerController.updateFarmer).delete(farmerController.deleteFarmer);
module.exports = router;
const router = require("express").Router();
const participantCtrl = require("../controllers/participantsController");
const userCtrl = require("../controllers/usersController");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const formData = require("multer"),
storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"AlphaGen"
    }
}),
uploads = formData({storage:storage}),
noImageFormParser = uploads.none(),
ImagesFormParser = uploads.fields([{name:"userdp"}]);

router.post("/create", userCtrl.protect, ImagesFormParser, participantCtrl.create);
router.post("/:id/get", participantCtrl.getone);
router.get("/getall", participantCtrl.getall);
router.put("/:id/update", participantCtrl.update);
router.delete("/:id/delete", participantCtrl.delete);

module.exports = router;
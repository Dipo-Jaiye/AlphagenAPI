const router = require("express").Router();
const bannerCtrl = require("../controllers/bannersController");
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
ImagesFormParser = uploads.fields([{name:"bannerdp"}]);

router.options("/create", cors({
    origin: true,
    credentials: true,
    maxAge: 86400
}));
router.post("/create", userCtrl.protect, ImagesFormParser, bannerCtrl.create);
router.get("/:id/get", userCtrl.protect, bannerCtrl.getone);
router.get("/getall", userCtrl.protect, bannerCtrl.getall);
router.put("/:id/update", userCtrl.protect, bannerCtrl.update);
router.delete("/:id/delete", userCtrl.protect, bannerCtrl.delete);

module.exports = router;
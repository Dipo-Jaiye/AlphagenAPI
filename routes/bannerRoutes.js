const router = require("express").Router();
const bannerCtrl = require("../controllers/bannersController");

router.post("/create", bannerCtrl.create);
router.get("/:id/get", bannerCtrl.getone);
router.get("/getall", bannerCtrl.getall);
router.put("/:id/update", bannerCtrl.update);
router.delete("/:id/delete", bannerCtrl.delete);

module.exports = router;
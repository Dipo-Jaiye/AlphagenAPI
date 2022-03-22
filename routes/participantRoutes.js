const router = require("express").Router();
const participantCtrl = require("../controllers/participantsController");

router.post("/create", participantCtrl.create);
router.post("/:id/get", participantCtrl.getone);
router.get("/getall", participantCtrl.getall);
router.put("/:id/update", participantCtrl.update);
router.delete("/:id/delete", participantCtrl.delete);

module.exports = router;
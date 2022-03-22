const router = require("express").Router();
const commentCtrl = require("../controllers/commentsController");

router.post("/create", commentCtrl.create);
router.post("/:id/get", commentCtrl.getone);
router.get("/getall", commentCtrl.getall);
router.put("/:id/update", commentCtrl.update);
router.delete("/:id/delete", commentCtrl.delete);

module.exports = router;
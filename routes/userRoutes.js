const router = require("express").Router();
const userCtrl = require("../controllers/usersController");

router.post("/register", userCtrl.create);
router.post("/login", userCtrl.login);

module.exports = router;
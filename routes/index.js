const router = require("express").Router();
const user = require("./userRoutes");
const comment = require("./commentRoutes");
const banner = require("./bannerRoutes");
const participant = require("./participantRoutes");

router.use("/user", user);
router.use("/comment", comment);
router.use("/banner", banner);
router.use("/participant", participant);

module.exports = router;
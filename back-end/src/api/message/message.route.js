const router = require("express").Router();
const messageController = require("./message.controller");
const { auth } = require("../../utils/auth");


router.route("/").post(auth, messageController.create);
router.route("/").get(auth, messageController.list);



module.exports = router;
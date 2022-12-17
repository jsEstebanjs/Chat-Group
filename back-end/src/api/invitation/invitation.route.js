const router = require("express").Router();
const invitationController = require("./invitation.controller");
const { auth } = require("../../utils/auth");

router.route("/").post(auth, invitationController.create);
router.route("/:id").delete(auth, invitationController.delete);
router.route("/acceptInvitation/:id").post(auth, invitationController.acceptInvitation);


module.exports = router;
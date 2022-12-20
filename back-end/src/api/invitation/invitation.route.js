const router = require("express").Router();
const invitationController = require("./invitation.controller");
const { auth } = require("../../utils/auth");

router.route("/").post(auth, invitationController.create);
router.route("/:id").delete(auth, invitationController.delete);
router.route("/:id").post(auth, invitationController.acceptInvitation);
router.route("/").get(auth, invitationController.list);


module.exports = router;
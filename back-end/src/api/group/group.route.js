const router = require("express").Router();
const groupController = require("./group.controller");
const { auth } = require("../../utils/auth");


router.route("/").post(auth, groupController.create);
router.route("/:id").get(auth, groupController.listById);
router.route("/:id").put(auth, groupController.update);
router.route("/leave/:id").put(auth, groupController.leaveGroup);
router.route("/adminOptions/:id").put(auth, groupController.adminOptions);
router.route("/:id").delete(auth, groupController.delete);

module.exports = router;
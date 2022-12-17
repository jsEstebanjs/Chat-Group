const router = require("express").Router();
const groupController = require("./group.controller");
const { auth } = require("../../utils/auth");


router.route("/").post(auth, groupController.create);
router.route("/:id").get(auth, groupController.listById);



module.exports = router;
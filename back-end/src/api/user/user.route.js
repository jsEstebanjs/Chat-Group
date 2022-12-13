const router = require("express").Router();
const userController = require("./user.controller");
const {auth}= require("../../utils/auth");

router.route("/login").post(userController.login);
router.route("/register").post(userController.register);
router.route("/").get(auth,userController.show);



module.exports = router;
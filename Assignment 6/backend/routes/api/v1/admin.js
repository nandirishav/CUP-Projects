const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
// import controller
const adminController = require("../../../controllers/api/v1/admin-controller");
const auth = require("../../../middlewares/auth");

//create a admin
//register
router.post("/register", adminController.register);
//login
router.post("/login", adminController.login);

// logout
router.post("/logout", adminController.logout);

module.exports = router;

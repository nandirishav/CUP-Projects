const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
// import controller
const adminController = require("../../../controllers/api/v1/admin-controller");
const AdminAuth = require("../../../middleware/adminAuth");

//create a admin
//register
router.post(
  "/register",
  [
    body("username").not().isEmpty().withMessage("Username is Empty"),
    body("email").not().isEmpty().withMessage("email is Empty"),
    body("password").not().isEmpty().withMessage("password is Empty"),
    // body("userType").not().isEmpty().withMessage("userType is Empty"),
  ],
  adminController.createAdmin
);

//login
router.post(
  "/login",
  [
    body("email").not().isEmpty().withMessage("email is Empty"),
    body("password").not().isEmpty().withMessage("password is Empty"),
  ],
  adminController.login
);

//logout
router.post("/logout", AdminAuth, adminController.logout);
router.get("/getAllAdmins", AdminAuth, adminController.getAdmin);
router.get("/me", AdminAuth, adminController.getAuthenticatedAdmin);
router.get("/getAdmin/:id", adminController.findAdminById); //may not be req. after we have created the /me route
router.put("/updateAdmin/me", AdminAuth, adminController.updateAdmin);
router.delete("/deleteAdmin/me", AdminAuth, adminController.deleteAdmin);
router.put("/verify", AdminAuth, adminController.getVerified);

module.exports = router;

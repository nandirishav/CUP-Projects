const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
// import controller
const supplierController = require("../../../controllers/api/v1/supplier-controller");
const SupplierAuth = require("../../../middleware/supplierAuth");

//create a supplier
//register
router.post(
  "/register",
  [
    body("username").not().isEmpty().withMessage("Username is Empty"),
    body("email").not().isEmpty().withMessage("email is Empty"),
    body("password").not().isEmpty().withMessage("password is Empty"),
    // body("userType").not().isEmpty().withMessage("userType is Empty"),
  ],
  supplierController.createSupplier
);

//login
router.post(
  "/login",
  [
    body("email").not().isEmpty().withMessage("email is Empty"),
    body("password").not().isEmpty().withMessage("password is Empty"),
  ],
  supplierController.login
);

//logout
router.post("/logout", SupplierAuth, supplierController.logout);
router.get("/getAllSuppliers", SupplierAuth, supplierController.getSupplier);
router.get("/me", SupplierAuth, supplierController.getAuthenticatedSupplier);
router.get("/getSupplier/:id", supplierController.findSupplierById); //may not be req. after we have created the /me route
router.put(
  "/updateSupplier/me",
  SupplierAuth,
  supplierController.updateSupplier
);
router.delete(
  "/deleteSupplier/me",
  SupplierAuth,
  supplierController.deleteSupplier
);
router.put("/verify", SupplierAuth, supplierController.getVerified);

module.exports = router;

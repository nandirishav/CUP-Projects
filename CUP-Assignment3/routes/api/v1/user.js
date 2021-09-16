const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
// import controller
const userController = require("../../../controllers/api/v1/user-controller");
const auth = require("../../../middleware/auth");

//create a user
//register
router.post(
  "/register",
  [
    body("username").not().isEmpty().withMessage("Username is Empty"),
    body("email").not().isEmpty().withMessage("email is Empty"),
    body("password").not().isEmpty().withMessage("password is Empty"),
    body("userType").not().isEmpty().withMessage("userType is Empty"),
  ],
  userController.createUser
);
//login
router.post(
  "/login",
  [
    body("email").not().isEmpty().withMessage("email is Empty"),
    body("password").not().isEmpty().withMessage("password is Empty"),
  ],
  userController.login
);

//logout
router.post("/logout", auth, userController.logout);

router.get("/getAllUsers", auth, userController.getUser);
router.get("/me", auth, userController.getAuthenticatedUser);
router.get("/getUser/:id", userController.findUserById); //may not be req. after we have created the /me route
router.put("/updateUser/me", auth, userController.updateUser);
router.delete("/deleteUser/me", auth, userController.deleteUser);

module.exports = router;

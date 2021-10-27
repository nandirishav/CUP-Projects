const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
// import controller
const userController = require("../../../controllers/api/v1/user-controller");
const auth = require("../../../middlewares/auth");

//create a user
//register
router.post("/register", userController.register);
//login
router.post(
  "/login",
  // [
  //   body("emailInput").not().isEmpty().withMessage("email is Empty"),
  //   body("passwordInput").not().isEmpty().withMessage("password is Empty"),
  // ],
  userController.login
);

// logout
router.post("/logout", userController.logout);

// // router.get("/getAllUsers", AdminAuth, userController.getUser); // admin can view all users
// router.get("/me", auth, userController.getAuthenticatedUser);
// router.get("/getUser/:id", userController.findUserById); //may not be req. after we have created the /me route
// router.put("/updateUser/me", auth, userController.updateUser);
// router.delete("/deleteUser/me", auth, userController.deleteUser);

module.exports = router;

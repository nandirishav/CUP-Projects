const express = require("express");
const router = express.Router();
// import controller
const assignmentController = require("../../../controllers/api/v1/as-controller");
// const auth = require("../../../middlewares/auth");
const multer = require("multer");
const upload = multer({ dest: "../../../../frontend/public/files" });

//add assignment
router.post("/addAssignment", assignmentController.addAssignment);

//get assignments
router.get("/", assignmentController.getAllAssignments);
router.post(
  "/uploadFile",
  upload.single("myFile"),
  assignmentController.uploadFile
);

//get user assignments
//pass user id to get user assignments
// router.get("/assignments/:id",auth,assignmentController.getAssignments);

module.exports = router;

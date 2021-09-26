const express = require("express");
const router = express.Router();

router.use("/product", require("./product"));
router.use("/user", require("./user"));

//make 2 more routes for supplier and for admin
router.use("/supplier", require("./supplier"));
router.use("/admin", require("./admin"));

// router.use("/auth", require("./auth"));

module.exports = router;

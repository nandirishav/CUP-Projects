const express = require("express");
const router = express.Router();

router.use("/assignments", require("./assignments"));
router.use("/user", require("./user"));
// router.use("/auth", require("./auth"));

module.exports = router;

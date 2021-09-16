const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { body } = require("express-validator");
// import controller
const productController = require("../../../controllers/api/v1/product-controller");

//create a product
router.post(
  "/create",
  [
    body("name").not().isEmpty().withMessage("Name is Empty"),
    body("quantity").isFloat({ gt: 0 }).withMessage("Quantity is less than 0"),
  ],
  auth,
  productController.createProduct
);
router.get("/getAllProducts", auth, productController.getProduct);
router.get("/getProduct/:id", auth, productController.findProductById);
router.put("/updateProduct/:id", auth, productController.updateProduct);
router.delete("/deleteProduct/:id", auth, productController.deleteProduct);

module.exports = router;

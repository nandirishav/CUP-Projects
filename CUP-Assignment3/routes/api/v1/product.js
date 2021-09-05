const express = require("express");
const router = express.Router();
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
  productController.createProduct
);
router.get("/getAllProducts", productController.getProduct);
router.get("/getProduct/:id", productController.findProductById);
router.put("/updateProduct/:id", productController.updateProduct);
router.delete("/deleteProduct/:id", productController.deleteProduct);

module.exports = router;

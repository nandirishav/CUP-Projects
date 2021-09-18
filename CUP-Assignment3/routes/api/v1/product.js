const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { body } = require("express-validator");
// import controller
const productController = require("../../../controllers/api/v1/product-controller");
const cartController = require("../../../controllers/api/v1/cart-controller");
const orderController = require("../../../controllers/api/v1/order-controller");
const SupplierAuth = require("../../../middleware/supplierAuth");

//create a product
router.post(
  "/create",
  [
    body("name").not().isEmpty().withMessage("Name is Empty"),
    body("quantity").isFloat({ gt: 0 }).withMessage("Quantity is less than 0"),
  ],
  SupplierAuth,
  productController.createProduct
);
router.get("/getAllProducts", productController.getAllProducts);
router.get("/getProducts", SupplierAuth, productController.getProducts); //supplier can view all the products added
router.get("/getProduct/:id", auth, productController.findProductById);
router.put("/updateProduct/:id", SupplierAuth, productController.updateProduct);
router.delete(
  "/deleteProduct/:id",
  SupplierAuth,
  productController.deleteProduct
);

//cart part
router.post("/addToCart", auth, cartController.addCartItem);
//update
router.put("/updateCartItem/:id", auth, cartController.updateCartItem);
//delete
router.delete("/deleteCartItem/:id", auth, cartController.deleteCartItem);
//get user cart
router.get("/cart", auth, cartController.getCart); //doubt

//order part
//create
router.post("/order", auth, orderController.addOrderItem);
//delete
router.delete("/deleteOrderItem/:id", auth, orderController.deleteOrderItem);
//get user cart
router.get("/orders", auth, orderController.getUserOrders); //doubt

module.exports = router;

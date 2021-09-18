const express = require("express");
const router = express.Router();
const cartController = require("../../../controllers/api/v1/cart-controller");

//create
router.post("/addToCart", auth, cartController.addCartItem);
//update
router.put("/updateCartItem/:id", auth, cartController.updateCartItem);
//delete
router.delete("/deleteCartItem/:id", auth, cartController.deleteCartItem);
//get user cart
router.get("/cart", auth, cartController.getCart); //doubt
//get carts of all users - for admin
// router.get("/cart",adminAuth,cartController.getCarts);

module.exports = router;

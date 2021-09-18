const express = require("express");
const router = express.Router();
const orderController = require("../../../controllers/api/v1/order-controller");

//create
router.post("/order", auth, orderController.addOrderItem);
//update
// router.put("/updateCartItem/:id", auth, orderController.updateCartItem);
//delete
router.delete("/deleteOrderItem/:id", auth, orderController.deleteOrderItem);
//get user cart
router.get("/orders", auth, orderController.getUserOrders); //doubt
//get carts of all users - for admin
// router.get("/cart",adminAuth,orderController.getCarts);

module.exports = router;

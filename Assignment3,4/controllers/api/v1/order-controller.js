const ProductModel = require("../../../models/Product");
const { validationResult } = require("express-validator");
const OrderModel = require("../../../models/Order");

//add
module.exports.addOrderItem = async (req, res) => {
  const newOrder = new OrderModel({
    ...req.body,
    userId: req.user._id,
  });
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

//update
// module.exports.updateOrderItem = async (req, res) => {
//   try {
//     const cartItem = await OrderModel.findOne({
//       _id: req.params.id,
//       owner: req.user._id,
//     });
//     // if (!cartItem) {
//     //   res.status(404).send("Product owner not identified");
//     // }
//     await cartItem.updateOne({ $set: req.body }, { new: true });
//     const updatedCartItem = await cartItem.save();
//     res.send(updatedCartItem);
//   } catch (error) {
//     // console.log("Error in updating Product", error);
//     res.send(error);
//   }
// };

//delete
module.exports.deleteOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderModel.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!orderItem) {
      res.status(404).send();
    }
    res.send(orderItem);
  } catch (error) {
    // console.log("Error in updating Product", error);
    res.status(500).json(error);
  }
};

//get user orders
module.exports.getUserOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({
      owner: req.user._id,
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get all users orders - for admin
// module.exports.getAllUsersOrders = async (req, res) => {
//   try {
//     const orders = await OrderModel.find({});
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

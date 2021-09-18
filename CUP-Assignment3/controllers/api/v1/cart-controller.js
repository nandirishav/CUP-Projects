const ProductModel = require("../../../models/Product");
const { validationResult } = require("express-validator");
const CartModel = require("../../../models/Cart");

//add
module.exports.addCartItem = async (req, res) => {
  const newCart = new CartModel(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(err);
  }
};

//update
module.exports.updateCartItem = async (req, res) => {
  try {
    const cartItem = await CartModel.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    // if (!cartItem) {
    //   res.status(404).send("Product owner not identified");
    // }
    await cartItem.updateOne({ $set: req.body }, { new: true });
    const updatedCartItem = await cartItem.save();
    res.send(updatedCartItem);
  } catch (error) {
    // console.log("Error in updating Product", error);
    res.send(error);
  }
};

//delete
module.exports.deleteCartItem = async (req, res) => {
  try {
    const cartItem = await CartModel.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!cartItem) {
      res.status(404).send();
    }
    res.send(cartItem);
  } catch (error) {
    // console.log("Error in updating Product", error);
    res.status(500).json(error);
  }
};

//get user cart
module.exports.getCart = async (req, res) => {
  try {
    const cart = await CartModel.findOne({
      owner: req.user._id,
    });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get all user carts - for admin
module.exports.getCart = async (req, res) => {
  try {
    const carts = await Cart.find({});
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
};

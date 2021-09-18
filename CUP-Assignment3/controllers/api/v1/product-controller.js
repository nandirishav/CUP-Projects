const ProductModel = require("../../../models/Product");
const { validationResult } = require("express-validator");

module.exports.createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // const data = await ProductModel.create(req.body);
    const data = await new ProductModel({
      ...req.body,
      owner: req.supplier._id,
    });
    await data.save();
    // console.log(data);
    res.status(200).send({ msg: "Product created Success", data: data });
  } catch (error) {
    console.log("Error in creating Product", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports.getProducts = async (req, res) => {
  try {
    // const data = await ProductModel.find({});

    // approach 1
    //find all products belonging to the respect. supplier
    const data = await ProductModel.find({ owner: req.supplier._id });

    //approach 2
    // await req.user.populate("myProducts").execPopulate();
    res.send(data);
  } catch (error) {
    console.log("Error in getting Product", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// anyone can view all products
module.exports.getAllProducts = async (req, res) => {
  try {
    const data = await ProductModel.find({});
    res.send(data);
  } catch (error) {
    // console.log("Error in getting Product", error);
    res.status(500).json({ msg: "All products could not be displayed ... " });
  }
};

//find product
module.exports.findProductById = async (req, res) => {
  const _id = req.params.id;
  try {
    // const data = await ProductModel.findById(_id);
    const data = await ProductModel.findOne({ _id, owner: req.user._id });
    if (!data) {
      return res.status(404).send();
    }
    res.send(data);

    // if (data._id) {
    //   res.status(200).send({ data: data });
    // } else {
    //   res.status(404).json({ msg: "Product was not Found" });
    // }
  } catch (error) {
    //   console.log("Error in getting Product", error);
    res.status(500).send();
  }
};

//update product
module.exports.updateProduct = async (req, res) => {
  try {
    const product = await ProductModel.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!product) {
      res.status(404).send("Product owner not identified");
    }
    await product.updateOne({ $set: req.body }, { new: true });
    const updatedProduct = await product.save();
    res.send(updatedProduct);
    // const product = await ProductModel.findByIdAndUpdate(
    //   req.params.id,
    //   {
    //     $set: req.body,
    //   },
    //   { new: true } // this gives the updated document after update
    // );
    // if (product._id) {
    //   res.status(200).json({ msg: "Updated Product", product });
    // } else {
    //   res.status(404).json({ msg: "Product not Found" });
    // }
  } catch (error) {
    // console.log("Error in updating Product", error);
    res.send(error);
  }
};

//delete product
module.exports.deleteProduct = async (req, res) => {
  try {
    // const product = await ProductModel.findById(req.params.id);
    const product = await ProductModel.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!product) {
      res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    // console.log("Error in deleting Product", error);
    res.status(500).json(error);
  }
};

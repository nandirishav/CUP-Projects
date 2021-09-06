const ProductModel = require("../../../models/Product");
const { validationResult } = require("express-validator");

module.exports.createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // const data = await new ProductModel(req.body);
    const data = await ProductModel.create(req.body);
    // console.log(data);
    res.status(200).send({ msg: "Product created Success", data: data });
  } catch (error) {
    console.log("Error in creating Product", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports.getProduct = async (req, res) => {
  try {
    const data = await ProductModel.find({});
    res.status(200).send({ msg: "Products", data: data });
  } catch (error) {
    console.log("Error in getting Product", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

//find product
module.exports.findProductById = async (req, res) => {
  try {
    const data = await ProductModel.findById(req.params.id);
    if (data._id) {
      res.status(200).send({ data: data });
    } else {
      res.status(404).json({ msg: "Product was not Found" });
    }
  } catch (error) {
    //   console.log("Error in getting Product", error);
    res.status(404).json({ msg: "Product not Found" });
  }
};

//update product
module.exports.updateProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (product._id) {
      res.status(200).json({ msg: "Updated Product", product });
    } else {
      res.status(500).json({ msg: "Product not Found" });
    }
  } catch (error) {
    // console.log("Error in updating Product", error);
    res.status(500).json({ msg: "Product not Found" });
  }
};

//delete product
module.exports.deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    try {
      await product.delete();
      res.status(200).json({ msg: "Product has been deleted..." });
    } catch (error) {
      res
        .status(404)
        .json({ msg: "Product was not found or already deleted !" });
    }
  } catch (error) {
    // console.log("Error in deleting Product", error);
    res.status(500).json(error);
  }
};

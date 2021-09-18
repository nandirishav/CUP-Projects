const SupplierModel = require("../../../models/Supplier");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const router = require("../../../routes");

//Register
module.exports.createSupplier = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // const data = await SupplierModel.create(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newSupplier = await new SupplierModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      userType: req.body.userType,
    });
    const supplier = await newSupplier.save();
    const token = await supplier.generateAuthToken();
    res.status(201).send({ supplier, token });
  } catch (error) {
    // console.log("Error in creating User", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

//Login
module.exports.login = async (req, res) => {
  try {
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const supplier = await SupplierModel.findOne({ email: req.body.email });
    const token = await supplier.generateAuthToken();
    if (!supplier) {
      res.status(404).json("supplier not found");
      return;
    }
    // !supplier && res.status(404).json("supplier not found");
    const validPassword = await bcrypt.compare(
      req.body.password,
      supplier.password
    );
    if (!validPassword) {
      res.status(400).json("Wrong Password");
      return;
    }
    // !validPassword && res.status(400).json("Wrong Password");
    // res.status(200).json({ msg: "User Login Successful", user });
    res.status(200).send({ supplier, token });
  } catch (error) {
    res.status(500).send(error);
  }
};

//logout
module.exports.logout = async (req, res) => {
  try {
    req.supplier.tokens = req.supplier.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.supplier.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
};

module.exports.getSupplier = async (req, res) => {
  try {
    const data = await SupplierModel.find({});
    res.status(200).send({ msg: "Suppliers", data: data });
  } catch (error) {
    console.log("Error in getting Supplier", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports.getAuthenticatedSupplier = async (req, res) => {
  res.send(req.supplier);
};

//find User
module.exports.findSupplierById = async (req, res) => {
  try {
    const data = await SupplierModel.findById(req.params.id);
    if (data._id) {
      res.status(200).send({ data: data });
    } else {
      res.status(404).json({ msg: "Supplier was not Found" });
    }
  } catch (error) {
    //   console.log("Error in getting Supplier", error);
    res.status(404).json({ msg: "Supplier not Found" });
  }
};

//update Supplier
module.exports.updateSupplier = async (req, res) => {
  try {
    await req.supplier.updateOne({ $set: req.body }, { new: true });
    await req.supplier.save();
    res.send(req.supplier);
  } catch (error) {
    res.status(500).send();
  }
};

//delete Supplier
module.exports.deleteSupplier = async (req, res) => {
  try {
    await req.supplier.remove();
    res.send(req.supplier);
  } catch (error) {
    // console.log("Error in deleting supplier", error);
    res.status(500).send();
  }
};

module.exports.getVerified = async (req, res) => {
  try {
    await req.supplier.updateOne({ isVerified: true }, { new: true });
    await req.supplier.save();
    res.send(req.supplier);
  } catch (error) {
    res.status(500).send();
  }
};

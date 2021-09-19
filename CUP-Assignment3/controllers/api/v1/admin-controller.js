const AdminModel = require("../../../models/Admin");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const router = require("../../../routes");

//Register
module.exports.createAdmin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // const data = await AdminModel.create(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newAdmin = await new AdminModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      userType: req.body.userType,
    });
    const admin = await newAdmin.save();
    const token = await admin.generateAuthToken();
    res.status(201).send({ admin, token });
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

    const admin = await AdminModel.findOne({ email: req.body.email });
    const token = await admin.generateAuthToken();
    if (!admin) {
      res.status(404).json("admin not found");
      return;
    }
    // !admin && res.status(404).json("admin not found");
    const validPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (!validPassword) {
      res.status(400).json("Wrong Password");
      return;
    }
    // !validPassword && res.status(400).json("Wrong Password");
    // res.status(200).json({ msg: "User Login Successful", user });
    res.status(200).send({ admin, token });
  } catch (error) {
    res.status(500).send(error);
  }
};

//logout
module.exports.logout = async (req, res) => {
  try {
    req.admin.tokens = req.admin.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.admin.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
};

module.exports.getAdmin = async (req, res) => {
  try {
    const data = await AdminModel.find({});
    res.status(200).send({ msg: "Admins", data: data });
  } catch (error) {
    console.log("Error in getting Admin", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports.getAuthenticatedAdmin = async (req, res) => {
  res.send(req.admin);
};

//find User
module.exports.findAdminById = async (req, res) => {
  try {
    const data = await AdminModel.findById(req.params.id);
    if (data._id) {
      res.status(200).send({ data: data });
    } else {
      res.status(404).json({ msg: "Admin was not Found" });
    }
  } catch (error) {
    //   console.log("Error in getting Admin", error);
    res.status(404).json({ msg: "Admin not Found" });
  }
};

//update Admin
module.exports.updateAdmin = async (req, res) => {
  try {
    await req.admin.updateOne({ $set: req.body }, { new: true });
    await req.admin.save();
    res.send(req.admin);
  } catch (error) {
    res.status(500).send();
  }
};

//delete admin
module.exports.deleteAdmin = async (req, res) => {
  try {
    await req.admin.remove();
    res.send(req.admin);
  } catch (error) {
    // console.log("Error in deleting admin", error);
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

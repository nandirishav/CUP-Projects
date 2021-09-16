const UserModel = require("../../../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const router = require("../../../routes");

//Register
module.exports.createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // const data = await UserModel.create(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      userType: req.body.userType,
    });
    const user = await newUser.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
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

    const user = await UserModel.findOne({ email: req.body.email });
    const token = await user.generateAuthToken();
    if (!user) {
      res.status(404).json("user not found");
      return;
    }
    // !user && res.status(404).json("user not found");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).json("Wrong Password");
      return;
    }
    // !validPassword && res.status(400).json("Wrong Password");
    // res.status(200).json({ msg: "User Login Successful", user });
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(500).json({ msg: "Error found" });
  }
};

//logout
module.exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const data = await UserModel.find({});
    res.status(200).send({ msg: "Users", data: data });
  } catch (error) {
    console.log("Error in getting User", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports.getAuthenticatedUser = async (req, res) => {
  res.send(req.user);
};

//find User
module.exports.findUserById = async (req, res) => {
  try {
    const data = await UserModel.findById(req.params.id);
    if (data._id) {
      res.status(200).send({ data: data });
    } else {
      res.status(404).json({ msg: "User was not Found" });
    }
  } catch (error) {
    //   console.log("Error in getting User", error);
    res.status(404).json({ msg: "User not Found" });
  }
};

//update User
module.exports.updateUser = async (req, res) => {
  try {
    // const user = await UserModel.findByIdAndUpdate(
    //   req.params.id,
    //   {
    //     $set: req.body,
    //   },
    //   { new: true } // this gives the updated document after update
    // );
    await req.user.updateOne({ $set: req.body }, { new: true });
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
};

//delete User
module.exports.deleteUser = async (req, res) => {
  try {
    // const user = await UserModel.findByIdAndDelete(req.user._id);

    // also delete products created by the tasks when deleting user
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    // console.log("Error in deleting User", error);
    res.status(500).send();
  }
};

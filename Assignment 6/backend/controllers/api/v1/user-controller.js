const UserModel = require("../../../models/User");
const bcrypt = require("bcrypt");
const router = require("../../../routes");
const jwt = require("jsonwebtoken");

//Register
module.exports.register = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;

    // Validate user input
    if (!(email && password && fullname && username)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await UserModel.create({
      fullname,
      username,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    // user.tokens = user.tokens.concat({ token: token }); //add the token to the tokens array
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error in Register" });
  }
};

//Login
module.exports.login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid Credentials");
    }
    if (await bcrypt.compare(password, user.password)) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      // user.tokens = user.tokens.concat({ token: token }); //add the token to the tokens array
      user.token = token;
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error found in Login" });
  }
};

//logout
module.exports.logout = async (req, res) => {
  console.log(req.body);
  try {
    req.body.token = "";
    // await req.body.save();
    res.send("LogOut Successful");
  } catch (error) {
    console.log(error);
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

const AdminModel = require("../../../models/Admin");
const bcrypt = require("bcrypt");
const router = require("../../../routes");
const jwt = require("jsonwebtoken");

//Register
module.exports.register = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;

    // Validate admin input
    if (!(email && password && fullname && username)) {
      res.status(400).send("All input is required");
    }

    const oldAdmin = await AdminModel.findOne({ email });

    if (oldAdmin) {
      return res.status(409).send("Admin Already Exists. Please Login");
    }

    //Encrypt admin password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create admin in our database
    const admin = await AdminModel.create({
      fullname,
      adminname,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { admin_id: admin._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    admin.token = token;

    // return new admin
    res.status(201).json(admin);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error in Register" });
  }
};

//Login
module.exports.login = async (req, res) => {
  try {
    // Get admin input
    const { email, password } = req.body;

    // Validate admin input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if admin exist in our database
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(400).send("Invalid Credentials");
    }
    if (await bcrypt.compare(password, admin.password)) {
      // Create token
      const token = jwt.sign(
        { admin_id: admin._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save admin token
      // admin.tokens = admin.tokens.concat({ token: token }); //add the token to the tokens array
      admin.token = token;
      res.status(200).json(admin);
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

//find Admin
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

//delete Admin
module.exports.deleteAdmin = async (req, res) => {
  try {
    // const user = await UserModel.findByIdAndDelete(req.user._id);

    await req.admin.remove();
    res.send(req.admin);
  } catch (error) {
    // console.log("Error in deleting admin", error);
    res.status(500).send();
  }
};

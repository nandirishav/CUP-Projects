const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const ProductModel = require("./Product");

const AdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    tokens: [
      {
        token: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

AdminSchema.virtual("myProducts", {
  ref: "ProductModel",
  localField: "_id", // local field is where the local data is stored
  foreignField: "owner", // it is the name of the field of the product that created this relationship
});

AdminSchema.methods.toJSON = function () {
  const admin = this;
  //get a raw object with the admin data attached
  const adminObject = admin.toObject();

  delete adminObject.password;
  delete adminObject.tokens;

  return adminObject;
};

AdminSchema.methods.generateAuthToken = async function () {
  const admin = this;
  const token = jwt.sign({ _id: admin._id.toString() }, "accessToken");

  //add the token to the tokens array
  admin.tokens = admin.tokens.concat({ token: token });
  await admin.save(); // saving the tokens to the db

  return token;
};

//delete user products when user is removed
AdminSchema.pre("remove", async function (next) {
  const admin = this;
  await ProductModel.deleteMany({ owner: admin._id });

  next();
});

module.exports = mongoose.model("Admin", AdminSchema);

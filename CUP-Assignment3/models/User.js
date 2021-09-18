const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const ProductModel = require("./Product");
const CartModel = require("./Cart");
const OrderModel = require("./Order");

const UserSchema = new mongoose.Schema(
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
    userType: {
      type: String,
      required: true,
    },
    tokens: [
      {
        token: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

// UserSchema.virtual("myProducts", {
//   ref: "ProductModel",
//   localField: "_id", // local field is where the local data is stored
//   foreignField: "owner", // it is the name of the field of the product that created this relationship
// });

UserSchema.virtual("myProducts", {
  ref: "CartModel",
  localField: "_id", // local field is where the local data is stored
  foreignField: "owner", // it is the name of the field of the product that created this relationship
});

UserSchema.virtual("myOrders", {
  ref: "OrderModel",
  localField: "_id", // local field is where the local data is stored
  foreignField: "userId", // it is the name of the field of the product that created this relationship
});

UserSchema.methods.toJSON = function () {
  const user = this;
  //get a raw object with the user data attached
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "accessToken");

  //add the token to the tokens array
  user.tokens = user.tokens.concat({ token: token });
  await user.save(); // saving the tokens to the db

  return token;
};

//delete user products when user is removed
UserSchema.pre("remove", async function (next) {
  const user = this;
  await ProductModel.deleteMany({ owner: user._id });

  next();
});

module.exports = mongoose.model("User", UserSchema);

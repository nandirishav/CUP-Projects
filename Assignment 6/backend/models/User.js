const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
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
    token: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const user = this;
  //get a raw object with the user data attached
  const userObject = user.toObject();

  delete userObject.password;
  // delete userObject.tokens;

  return userObject;
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "privatekey"); //passing user id as payload
  //add the token to the tokens array
  user.tokens = user.tokens.concat({ token: token });
  await user.save(); // saving the tokens to the db

  return token;
};

//delete user products when user is removed
// UserSchema.pre("remove", async function (next) {
//   const user = this;
//   await ProductModel.deleteMany({ owner: user._id });

//   next();
// });

module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const ProductModel = require("./Product");

const SupplierSchema = new mongoose.Schema(
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
    isVerified: {
      type: Boolean,
      default: false,
    },
    tokens: [
      {
        token: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

SupplierSchema.virtual("myProducts", {
  ref: "ProductModel",
  localField: "_id", // local field is where the local data is stored
  foreignField: "owner", // it is the name of the field of the product that created this relationship
});

SupplierSchema.methods.toJSON = function () {
  const supplier = this;
  //get a raw object with the supplier data attached
  const supplierObject = supplier.toObject();

  delete supplierObject.password;
  delete supplierObject.tokens;

  return supplierObject;
};

SupplierSchema.methods.generateAuthToken = async function () {
  const supplier = this;
  const token = jwt.sign({ _id: supplier._id.toString() }, "accessToken");

  //add the token to the tokens array
  supplier.tokens = supplier.tokens.concat({ token: token });
  await supplier.save(); // saving the tokens to the db

  return token;
};

//delete user products when user is removed
SupplierSchema.pre("remove", async function (next) {
  const supplier = this;
  await ProductModel.deleteMany({ owner: supplier._id });

  next();
});

module.exports = mongoose.model("Supplier", SupplierSchema);

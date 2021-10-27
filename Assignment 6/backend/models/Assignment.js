const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Uploaded file must have a name"],
    },
    teacher: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
    },
    date: {
      type: Date,
    },
    // owner: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "UserModel",
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assignment", assignmentSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // ======================
    // USER NAME
    // ======================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // ======================
    // USER EMAIL
    // ======================
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    // ======================
    // USER PASSWORD
    // ======================
    password: {
      type: String,
      required: true,
    },

    // ======================
    // USER ROLE
    // ======================
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
  },
  {
    // ======================
    // AUTO TIMESTAMPS
    // ======================
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
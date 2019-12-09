const mongoose = require("mongoose");
const { restaurantSchema } = require("./restaurantModel");

//Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    email_id: {
      type: String,
      trim: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      trim: true,
      required: true
    },
    address: {
      type: String,
      trim: true,
      required: true
    },
    phone_number: {
      type: String,
      trim: true,
      required: true
    },
    is_owner: {
      type: Boolean,
      trim: true,
      default: false
    },
    restaurant: {
      type: restaurantSchema
    },
    user_image: {
      type: String,
      trim: true,
      default: "userplaceholder.png"
    }
  },
  { versionKey: false }
);

//Model
const User = mongoose.model("User", userSchema);

exports.User = User;

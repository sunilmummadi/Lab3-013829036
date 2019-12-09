const mongoose = require("mongoose");
const { sectionSchema } = require("./sectionModel");
const Schema = mongoose.Schema;
//Schema
const restaurantSchema = new mongoose.Schema(
  {
    owner_user_id: {
      type: Schema.Types.ObjectId,
      trim: true
    },
    res_name: {
      type: String,
      trim: true,
      required: true
    },
    res_cuisine: {
      type: String,
      trim: true,
      required: true
    },
    res_zip_code: {
      type: Number,
      trim: true,
      required: true
    },
    res_image: {
      type: String,
      trim: true,
      default: "resplaceholder.png"
    },
    menu_sections: [sectionSchema]
  },
  { versionKey: false }
);

//Model
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

exports.Restaurant = Restaurant;
exports.restaurantSchema = restaurantSchema;

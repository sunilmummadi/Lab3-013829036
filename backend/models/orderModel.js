const mongoose = require("mongoose");
const { chatSchema } = require("./chatModel");
const Schema = mongoose.Schema;

var orderItem = {
  menu_section_name: { type: String, trim: true, required: true },
  menu_section_id: {
    type: Schema.Types.ObjectId,
    trim: true,
    required: true
  },
  item_name: { type: String, trim: true, required: true },
  item_price: { type: Number, trim: true, required: true },
  item_description: { type: String, trim: true, required: true },
  item_quantity: { type: Number, trim: true, required: true },
  item_image: { type: String, trim: true, default: "itemplaceholder.png" },
  _id: {
    type: Schema.Types.ObjectId,
    trim: true,
    required: true
  }
};

var customer = {
  _id: { type: Schema.Types.ObjectId, trim: true, required: true },
  name: { type: String, trim: true, required: true },
  address: { type: String, trim: true, required: true },
  phone_number: { type: String, trim: true, required: true },
  email_id: { type: String, trim: true, required: true },
  user_image: { type: String, trim: true }
};

var restaurant = {
  _id: { type: Schema.Types.ObjectId, trim: true, required: true },
  res_name: { type: String, trim: true, required: true },
  res_zip_code: { type: Number, trim: true, required: true },
  res_image: { type: String, trim: true },
  owner_user_id: { type: Schema.Types.ObjectId, trim: true, required: true },
  address: { type: String, trim: true, required: true },
  phone_number: { type: String, trim: true, required: true }
};

const ordersSchema = new mongoose.Schema(
  {
    customer: customer,
    restaurant: restaurant,
    status: { type: String, trim: true, required: true },
    sub_total: { type: Number, trim: true, required: true },
    delivery: { type: Number, trim: true, required: true },
    tax: { type: String, trim: true, required: true },
    total: { type: String, trim: true, required: true },
    order_date: { type: String, trim: true, required: true },
    cart_items: [orderItem],
    chat: [chatSchema]
  },
  {
    versionKey: false
  }
);

//Model
const Order = mongoose.model("Order", ordersSchema);

exports.Order = Order;

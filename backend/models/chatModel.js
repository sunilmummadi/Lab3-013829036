const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Schema
const chatSchema = new mongoose.Schema(
  {
    sender_id: {
      type: Schema.Types.ObjectId,
      trim: true,
      required: true
    },
    order_id: {
      type: Schema.Types.ObjectId,
      trim: true,
      required: true
    },
    receiver_id: {
      type: Schema.Types.ObjectId,
      trim: true
    },
    sender_name: { type: String, required: true },
    receiver_name: { type: String },
    message_content: { type: String, required: true },
    message_time: { type: String }
  },
  { versionKey: false }
);

//Model
const Chat = mongoose.model("Chat", chatSchema);

exports.Chat = Chat;
exports.chatSchema = chatSchema;

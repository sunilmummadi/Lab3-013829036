const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema
const itemSchema = new mongoose.Schema(
  {
    menu_section_name: { type: String, trim: true, required: true },
    menu_section_id: {
      type: Schema.Types.ObjectId,
      trim: true,
      required: true
    },
    item_name: { type: String, trim: true, required: true },
    item_price: { type: Number, trim: true, required: true },
    item_description: { type: String, trim: true, required: true },
    item_image: { type: String, trim: true, default: "itemplaceholder.png" }
  },
  { versionKey: false }
);

//Model
const Item = mongoose.model("Item", itemSchema);

//Validation for Insert API
function validateInsertItem(item) {
  const schema = {
    item_name: Joi.string().required(),
    item_price: Joi.number().required(),
    item_description: Joi.string().required(),
    item_image: Joi.string()
  };

  return Joi.validate(item, schema);
}

//Validation for Update API
function validateUpdateItem(item) {
  const schema = {
    item_name: Joi.string(),
    item_price: Joi.number(),
    item_description: Joi.string(),
    item_image: Joi.string()
  };
  return Joi.validate(item, schema);
}

exports.Item = Item;
exports.validateInsert = validateInsertItem;
exports.validateUpdate = validateUpdateItem;
exports.itemSchema = itemSchema;

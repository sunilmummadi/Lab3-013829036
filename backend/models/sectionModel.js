const Joi = require("joi");
const mongoose = require("mongoose");
const { itemSchema } = require("./itemModel");
const Schema = mongoose.Schema;

//Schema
const sectionSchema = new mongoose.Schema(
  {
    menu_section_name: {
      type: String,
      trim: true,
      required: true
    },
    restaurant_id: {
      type: Schema.Types.ObjectId,
      trim: true,
      required: true
    },
    menu_items: [itemSchema]
  },
  { versionKey: false }
);

//Model
const Section = mongoose.model("Section", sectionSchema);

//Validation for Insert API
function validateInsertSection(section) {
  const schema = {
    menu_section_name: Joi.string().required(),
    menu_items: Joi.array(),
    is_active: Joi.boolean()
  };

  return Joi.validate(section, schema);
}

//Validation for Update API
function validateUpdateSection(section) {
  const schema = {
    menu_section_name: Joi.string().required(),
    menu_items: Joi.array(),
    is_active: Joi.boolean()
  };

  return Joi.validate(section, schema);
}

exports.Section = Section;
exports.validateInsert = validateInsertSection;
exports.validateUpdate = validateUpdateSection;
exports.sectionSchema = sectionSchema;

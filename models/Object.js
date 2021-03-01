const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const objectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  name_latin: {
    type: String,
    unique: true,
  },
  family: {
    type: String,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  times_found: {
    type: Number,
    default: 0,
  },
});

objectSchema.plugin(uniqueValidator);

const Object = mongoose.model('Object', objectSchema);

module.exports = Object;

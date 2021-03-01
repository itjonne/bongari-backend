const mongoose = require('mongoose');

const LatLon = {
  lat: { type: Number },
  lon: { type: Number },
};

const findSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  object: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Object',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  location: {
    type: LatLon,
    default: null,
  },
  image: {
    type: String,
    default: '',
  },
  information: {
    type: String,
    default: '',
  },
});

const Find = mongoose.model('Find', findSchema);

module.exports = Find;

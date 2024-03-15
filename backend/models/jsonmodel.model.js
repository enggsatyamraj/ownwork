

const mongoose = require('mongoose');

const jsonSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  jsonContent: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
});

const JSONModel = mongoose.model('JSONModel', jsonSchema);

module.exports = JSONModel;
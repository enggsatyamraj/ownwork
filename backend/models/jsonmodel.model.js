const mongoose = require("mongoose");

const jsonSchema = new mongoose.Schema({
  url: String,
  jsonContent: Object,
});

const JsonModel = mongoose.model("JsonModel", jsonSchema);

module.exports = JsonModel;

const JSON = require("../models/jsonmodel.model");
const dotenv = require("dotenv");
require("dotenv").config();
exports.uploadJson = async (req, res) => {
  try {
    const { jsonContent } = req.body;
    // write a function to genrater a unique url combinig the number and alphabets
    const url = Math.random().toString(36).substring(2, 14);
    console.log(url);
    const fullurl = `http://localhost:${process.env.PORT}/api/json/${url}`;
    console.log(fullurl);
    const newJsonData = new JSON({ fullurl, jsonContent });
    await newJsonData.save();
    return res.status(200).json({
      success: true,
      message: "successfully created the url",
      url: fullurl,
    });
  } catch (err) {
    console.log(err);
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

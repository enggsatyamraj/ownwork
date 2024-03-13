const JSONModel = require("../models/jsonmodel.model");
const dotenv = require("dotenv");
require("dotenv").config();
exports.uploadJson = async (req, res) => {
  try {
    console.log(`data.........${req.body}`)
    const jsonContent  = req.body;
    // console.log({jsonContent})
    // write a function to genrater a unique url combinig the number and alphabets
    const url = Math.random().toString(36).substring(2, 14);
    console.log(url);
    const fullurl = `http://localhost:3001/api/v1/uploadjson/${url}`;
    console.log(fullurl);
    const newJsonData = new JSONModel({ fullurl , jsonContent});
    console.log(newJsonData)
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

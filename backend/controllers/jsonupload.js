const JSONModel = require("../models/jsonmodel.model");

exports.uploadJson = async (req, res) => {
  try {
    console.log(`data.........${req.body}`);
    const jsonContent = req.body;
    // Generate a unique URL combining numbers and alphabets
    const url = Math.random().toString(36).substring(2, 14);
    console.log(url);
    // Construct the full URL
    const fullurl = `https://ownwork.onrender.com/api/v1/showjson/${url}`;
    console.log(fullurl);
    const newJsonData = new JSONModel({ url, jsonContent });
    console.log(newJsonData);
    await newJsonData.save();
    return res.status(200).json({
      success: true,
      message: "successfully created the url",
      smallurl: url,
      url: fullurl,
      jsonContent: jsonContent,
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

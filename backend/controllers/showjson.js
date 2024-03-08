const JSON = require("../models/jsonmodel.model");

exports.showjson = async (req, res) => {
  try {
    const { url } = req.params;
    const jsonData = await JSON.findOne({ url });
    if (!jsonData) {
      return res.status(403).json({
        success: false,
        message: "No such url found",
      });
    }
    return res.status(200).json(jsonData.jsonContent);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

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

exports.showjsonByQuery = async (req, res) => {
  try {
    const { url, id } = req.params;

    // const jsonData = await JSON.findOne({$or: [{url}, {_id: id}]});
    const jsonData = await JSON.findOne({ url });

    if (!jsonData) {
      return res.status(403).json({
        success: false,
        message: "No such url found",
      });
    }
    if (id) {
      const selectedItem = jsonData.jsonContent.find(
        (item) => item.id.toString() === id
      );
      if (!selectedItem) {
        return res.status(403).json({
          success: false,
          message: "No such id found",
        });
      } else {
        return res.status(200).json(selectedItem);
      }
    } else {
      return res.status(200).json(jsonData.jsonContent);
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

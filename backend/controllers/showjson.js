const JSON = require('../models/jsonmodel.model')

exports.showjson = async (req, res) => {
  try {
    const { url } = req.params; // Change to req.params to retrieve URL parameter
    console.log("this is the req.params ...............", req.params)
    const jsonData = await JSON.findOne({ url });
    console.log("this is the url sir sjkdnjasn.inside.showjson......................................", url)
    if (!jsonData) {
      return res.status(403).json({
        success: false,
        message: "No such url found inside.showjson",
        url: url
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

exports.showIndividualJson = async (req, res) => {
  try {
    const { url, id } = req.params;
    console.log("this is the req.params ...............", req.params)
    const jsonData = await JSON.findOne({ url });
    console.log("this is the jsonData...........", jsonData)
    
    if (!jsonData) {
      return res.status(403).json({
        success: false,
        message: "No such URL found",
        url: url
      });
    }

    const individualData = jsonData.jsonContent.find(item => item.id == id);
    if (!individualData) {
      return res.status(404).json({
        success: false,
        message: "No such data entry found",
        id: id
      });
    }
    
    return res.status(200).json(individualData);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
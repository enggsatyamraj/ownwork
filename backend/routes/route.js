const express = require("express");
const { uploadJson } = require("../controllers/jsonupload");
const { showjson, showIndividualJson } = require("../controllers/showjson");
const router = express.Router();

router.post("/uploadjson", uploadJson);
router.get("/showjson/:url", showjson); 
router.get("/showjson/:url/:id", showIndividualJson);// Changed route definition to accept a URL parameter
module.exports = router;

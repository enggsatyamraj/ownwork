const express = require("express");
const { uploadJson } = require("../controllers/jsonupload");
const { showjson } = require("../controllers/showjson");
const router = express.Router();

router.post("/uploadjson", uploadJson);
router.get("/showjson", showjson);
module.exports = router;

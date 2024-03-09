const express = require("express");
const { uploadJson } = require("../controllers/jsonupload");
const { showjson, showjsonByQuery } = require("../controllers/showjson");
const router = express.Router();

router.post("/uploadjson", uploadJson);
router.get("/showjson", showjson);
router.get("/showjson/:url/:id?",showjsonByQuery);
module.exports = router;

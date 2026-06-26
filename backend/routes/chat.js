const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const chatController = require("../controllers/chat.js");

router.post("/", chatController.chatBot);

module.exports = router;
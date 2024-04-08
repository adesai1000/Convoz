const express = require("express");
const { createChat, findChat, userChats, fetchRID, fetchUID } = require('../controller/ChatController');
const router = express.Router();

router.post("/", createChat);
router.get("/:userId", userChats);
router.get("/find/:firstId/:secondId", findChat);
router.post("/findrid", fetchRID);
router.post("/finduid", fetchUID)

module.exports = router;

const express = require("express");
const {createReply} = require("../controller/NestedCommentController")

const router = express.Router();

router.post("/replyComment", createReply)


module.exports = router;
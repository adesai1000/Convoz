const express = require("express");
const { createComment, deleteComment, fetchComments } = require("../controller/CommentController");

const router = express.Router();

router.post("/create", createComment);
router.post("/delete", deleteComment);
router.post("/fetch", fetchComments)
module.exports = router;
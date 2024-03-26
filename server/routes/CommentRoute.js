const express = require("express");
const { createComment, deleteComment, fetchComments, fetchAllUserComments } = require("../controller/CommentController");

const router = express.Router();

router.post("/create", createComment);
router.post("/delete", deleteComment);
router.post("/fetch", fetchComments);
router.post("/all", fetchAllUserComments);
module.exports = router;
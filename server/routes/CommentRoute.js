const express = require("express");
const { createComment, deleteComment, fetchComments, fetchAllUserComments, editComment, upvoteComment, removeUpvoteFromComment } = require("../controller/CommentController");

const router = express.Router();

router.post("/create", createComment);
router.post("/delete", deleteComment);
router.post("/fetch", fetchComments);
router.post("/all", fetchAllUserComments);
router.post("/edit", editComment);
router.post("/upvote",upvoteComment );
router.post("/removeupvote", removeUpvoteFromComment);
module.exports = router;
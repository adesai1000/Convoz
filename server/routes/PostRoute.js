const express = require("express");
const { createPost, findPost, deletePost, fetchPosts, editPost, upvotePost, removeUpvote, getPostIdsByUserId } = require("../controller/PostController");

const router = express.Router();

router.post("/", createPost);
router.get("/all", fetchPosts);
router.get("/:postId", findPost);
router.post("/delete", deletePost);
router.post("/edit", editPost)
router.post("/upvotepost", upvotePost)
router.post("/removeupvotepost", removeUpvote)
router.post("/allupvotedposts", getPostIdsByUserId)
module.exports = router;

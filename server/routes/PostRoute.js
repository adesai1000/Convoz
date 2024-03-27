const express = require("express");
const { createPost, findPost, deletePost, fetchPosts, editPost } = require("../controller/PostController");

const router = express.Router();

router.post("/", createPost);
router.get("/all", fetchPosts);
router.get("/:postId", findPost);
router.post("/delete", deletePost);
router.post("/edit", editPost)
module.exports = router;

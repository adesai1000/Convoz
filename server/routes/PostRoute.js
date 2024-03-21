const express = require("express");
const { createPost, findPost, deletePost, fetchPosts, fetchTopPosts } = require("../controller/PostController");

const router = express.Router();

router.post("/", createPost);
router.get("/all", fetchPosts);
router.get("/:postId", findPost);
router.post("/delete", deletePost);
router.get("/top", fetchTopPosts); // Ensure that this line associates "/top" route with fetchTopPosts function
module.exports = router;

const PostModel = require("../model/PostModel");

module.exports.createPost = async (req, res) => {
    const { title, content, posterUserId, posterUsername } = req.body;
    const newPost = new PostModel({
        title,
        content,
        posterUserId,
        posterUsername
    });
    try {
        const result = await newPost.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports.findPost = async (req, res) => {
    const { postId } = req.params;
    try {
        const resultPost = await PostModel.findOne({ _id: postId });
        if (resultPost) {
            res.status(200).json(resultPost);
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports.deletePost = async (req, res) => {
    const { postId, posterUserId } = req.body;
    try {
        const deletedPost = await PostModel.findOneAndDelete({ _id: postId, posterUserId: posterUserId });
        if (deletedPost) {
            res.status(200).json({ message: "Post deleted successfully", deletedPost });
        } else {
            res.status(404).json({ message: "Post not found or unauthorized to delete" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports.fetchPosts = async (req, res) => {
    try {
        const allPosts = await PostModel.find();
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports.editPost = async (req, res) => {
    const { postId, title, content } = req.body;
    try {
        const updatedPost = await PostModel.findOneAndUpdate(
            { _id: postId },
            { $set: {title:title, content: content, isEdited: true } },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post updated successfully", updatedPost });
    } catch (error) {
        console.error("Error editing Post:", error);
        res.status(500).json(error);
    }
};

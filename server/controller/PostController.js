const PostModel = require("../model/PostModel");
const CommentModel = require("../model/CommentModel")
const PostUpvoteModel = require("../model/PostUpvoteModel");
const User = require("../model/User");
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
            // Fetch user data for the poster of the post
            const poster = await User.findById(resultPost.posterUserId);
            // Include isVip status in the post object
            const postWithIsVip = {
                ...resultPost.toObject(),
                isVip: poster ? poster.isVip : false
            };
            res.status(200).json(postWithIsVip);
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
        const deletePostComments = await CommentModel.deleteMany({postId: postId})
        if (deletedPost && deletePostComments) {
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

        // Create an array to store promises of fetching user data
        const userPromises = allPosts.map(post => User.findById(post.posterUserId));

        // Wait for all user data promises to resolve
        const users = await Promise.all(userPromises);

        // Update each post object with the isVip status
        const postsWithIsVip = allPosts.map((post, index) => {
            return {
                ...post.toObject(),
                isVip: users[index] ? users[index].isVip : false
            };
        });

        res.status(200).json(postsWithIsVip);
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


module.exports.upvotePost = async (req, res) => {
    const { postId, userId } = req.body;
    try {
        const existingUpvote = await PostUpvoteModel.findOne({ postId, upvoters: userId });

        if (existingUpvote) {
            return res.status(400).json({ message: "User has already upvoted this post" });
        }

        const updatedPost = await PostModel.findByIdAndUpdate(
            postId,
            { $inc: { upvotes: 1 } },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        await PostUpvoteModel.findOneAndUpdate(
            { postId },
            { $push: { upvoters: userId } },
            { upsert: true }
        );

        res.status(200).json({ message: "Post upvoted successfully", updatedPost });
    } catch (error) {
        console.error("Error upvoting Post:", error);
        res.status(500).json(error);
    }
};


module.exports.removeUpvote = async (req, res) => {
    const { postId, userId } = req.body;
    try {
        const existingUpvote = await PostUpvoteModel.findOne({ postId, upvoters: userId });

        if (!existingUpvote) {
            return res.status(400).json({ message: "User has not upvoted this post" });
        }

        const updatedPost = await PostModel.findByIdAndUpdate(
            postId,
            { $inc: { upvotes: -1 } },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        await PostUpvoteModel.findOneAndUpdate(
            { postId },
            { $pull: { upvoters: userId } }
        );

        res.status(200).json({ message: "Upvote removed successfully", updatedPost });
    } catch (error) {
        console.error("Error removing upvote from Post:", error);
        res.status(500).json(error);
    }
};

module.exports.getPostIdsByUserId = async (req, res) => {
    const { userId } = req.body;

    try {
        const posts = await PostUpvoteModel.find({ upvoters: userId }, { postId: 1, _id: 0 });
        const postIds = posts.map(post => post.postId);
        res.status(200).json(postIds);
    } catch (error) {
        console.error('Error fetching post IDs:', error);
        res.status(500).json({ error: 'Error fetching post IDs' });
    }
};



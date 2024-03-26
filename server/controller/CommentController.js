const CommentModel = require("../model/CommentModel");
const PostModel = require("../model/PostModel");

module.exports.createComment = async (req, res) => {
    const { content, postId, commenterUserId, commenterUsername } = req.body;
    const newComment = new CommentModel({
        content,
        postId,
        commenterUserId,
        commenterUsername
    });

    try {
        const result = await newComment.save();

        // Fetch count of comments with the same postId
        const commentCount = await CommentModel.countDocuments({ postId });

        // Update the totalComments field in the PostModel
        await PostModel.findOneAndUpdate(
            { _id: postId },
            { $set: { totalComments: commentCount } }
        );

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports.deleteComment = async (req, res) => {
    const { commentId, commenterUsername } = req.body;
    try {
        const deleteComment = await CommentModel.findOneAndDelete({ _id: commentId, commenterUsername: commenterUsername });
        if (deleteComment) {
            // Fetch count of comments with the same postId after deletion
            const commentCount = await CommentModel.countDocuments({ postId: deleteComment.postId });

            // Update the totalComments field in the PostModel
            await PostModel.findOneAndUpdate(
                { _id: deleteComment.postId },
                { $set: { totalComments: commentCount } }
            );

            res.status(200).json({ message: "Comment Deleted Successfully", deleteComment });
        } else {
            res.status(400).json({ message: "Comment not found or unauthorized to delete" });
        }
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json(error);
    }
};


module.exports.fetchComments = async (req, res) => {
    const { postId } = req.body;
    try {
        const comments = await CommentModel.find({ postId: postId });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.fetchAllUserComments = async(req,res) =>{
    const {username} = req.body;
    try{
        const userComments = await CommentModel.find({ commenterUsername: username});
        res.status(200).json(userComments)
    }
    catch(error){
        res.status(500).json(error)
    }
}
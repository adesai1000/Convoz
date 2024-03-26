const CommentModel = require("../model/CommentModel");

module.exports.createComment = async(req,res) =>{
    const {content, postId, commenterUserId, commenterUsername} = req.body; 
    const newComment= new CommentModel({
        content,
        postId,
        commenterUserId,
        commenterUsername
    });
    try{
        const result = await newComment.save();
        res.status(200).json(result)
    }
    catch(error){
        res.status(500).json(error)
    }
}
module.exports.deleteComment = async (req, res) => {
    try {
        const deleteComment = await CommentModel.findOneAndDelete({ _id: commentId, commenterUsername: commenterUsername });
        if (deleteComment) {
            res.status(200).json({ message: "Comment Deleted Successfully", deleteComment });
        } else {
            res.status(400).json({ message: "Comment not found or unauthorized to delete" });
        }
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json(error);
    }
}



module.exports.fetchComments = async (req, res) => {
    const { postId } = req.body;
    try {
        const comments = await CommentModel.find({ postId: postId });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json(error);
    }
}

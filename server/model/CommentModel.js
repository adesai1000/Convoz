const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    postedOn: { type: Date, default: Date.now },
    postId:{ type:String, required:true },
    commenterUserId: { type: String, required: true },
    commenterUsername: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    isEdited: { type: Boolean, default: false }
});

const CommentModel = mongoose.model("Comment", commentSchema);

module.exports = CommentModel;

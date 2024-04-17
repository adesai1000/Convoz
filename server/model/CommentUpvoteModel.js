const mongoose = require("mongoose");

const commentUpvoteSchema = new mongoose.Schema({
    commentId: {
        type: String,
        required: true
    },
    upvoters: [{
        type: String,
        required: true
    }]
});

const commentUpvoteModel = mongoose.model("CommentUpvote", commentUpvoteSchema);

module.exports = commentUpvoteModel;

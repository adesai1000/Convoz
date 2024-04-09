const mongoose = require("mongoose");

const postUpvoteSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    upvoters: [{
        type: String,
        required: true
    }]
});

const postUpvoteModel = mongoose.model("PostUpvote", postUpvoteSchema);

module.exports = postUpvoteModel;

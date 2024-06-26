const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    postedOn: { type: Date, default: Date.now },
    posterUserId: { type: String, required: true },
    posterUsername: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    totalComments: { type: Number, default: 0 },
    isEdited: { type: Boolean, default: false }
});

const PostModel = mongoose.model("Post", postSchema);

module.exports = PostModel;

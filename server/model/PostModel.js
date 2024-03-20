const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    postedOn: { type: Date, default: Date.now },
    posterUserId: { type: String, required: true },
    posterUsername: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    totalComments: { type: Number, default: 0 },
    totalScore: { type: Number, default: 0 } 
});
postSchema.methods.calculateTotalScore = function() {
    return this.upvotes - this.downvotes;
};
postSchema.pre('save', function(next) {
    this.totalScore = this.calculateTotalScore();
    next();
});

const PostModel = mongoose.model("Post", postSchema);

module.exports = PostModel;

const mongoose = require("mongoose");

const nestedCommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    repliedOn: { type: Date, default: Date.now },
    repliedTo:{ type:String, required:true },
    replierUserId: { type: String, required: true },
    replierUsername: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    isEdited: { type: Boolean, default: false }
});

const NestedCommentModel = mongoose.model("NestedComment", nestedCommentSchema);

module.exports = NestedCommentModel;

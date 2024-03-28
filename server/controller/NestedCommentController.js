const NestedCommentModel = require('../model/NestedCommentModel');

module.exports.createReply = async (req, res) => {
    const { content, repliedTo, replierUserId, replierUsername } = req.body;
    const newReply = new NestedCommentModel({
        content,
        repliedTo,
        replierUserId,
        replierUsername
    });

    try {
        const result = await newReply.save();

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};
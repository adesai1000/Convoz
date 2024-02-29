const chatModel = require('../model/chatModel'); // Import the chatModel

module.exports.createChat = async (req, res) => {
    const newChat = new chatModel({
        members: [req.body.senderId, req.body.receiverId],
    });
    try {
        const result = await newChat.save();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.userChats = async (req, res) => {
    try {
        const chat = await chatModel.find({ members: { $in: [req.params.userId] } });
        res.status(200).json(chat);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.findChat = async (req, res) => {
    try {
        const chat = await chatModel.findOne({ members: { $all: [req.params.firstId, req.params.secondId] } });
        res.status(200).json(chat);
    } catch (err) {
        res.status(500).json(err);
    }
};

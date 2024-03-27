const chatModel = require('../model/chatModel');
const User = require('../model/User')

module.exports.createChat = async (req, res) => {
    const newChat = new chatModel({
        members: [req.body.senderId, req.body.receiverId, req.body.sender, req.body.receiver],
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

module.exports.fetchRID = async (req, res) => {
    try {
        const { receiverUsername } = req.body;
        const user = await User.findOne({ username: receiverUsername });
        if (user) {
            res.status(200).json({ userId: user._id });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
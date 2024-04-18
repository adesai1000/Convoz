const User = require("../model/User");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
const Post = require("../model/PostModel");
const CommentModel = require("../model/CommentModel");
const chatModel = require('../model/chatModel');
const ChatModel = require("../model/chatModel");
const MessageModel = require("../model/messageModel");

module.exports.Signup = async (req, res, next) => {
    try {
        const { email, password, username, createdAt } = req.body;
        const both = await User.findOne({ username, email });
        if (both) {
            return res.json({ message: "Username and Email already exist." });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "Email already exists." });
        }
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.json({ message: "This username is taken." });
        }

        const user = await User.create({ email, password, username, createdAt });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true,
        });
        res.status(201).json({ message: "User created successfully.", success: true });
        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports.Login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.json({ message: "All Fields are required" });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({ message: "Username is incorrect" });
        }
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.json({ message: "Password is incorrect" });
        }

        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(202).json({ message: "User logged in successfully", success: true });
        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports.deleteProfile = async(req,res) =>{
    try{
    const {userId} = req.body; 
    const deleteUser = await User.findByIdAndDelete({_id: userId})
    const deleteUserPost = await Post.deleteMany({posterUserId: userId})
    const deleteUserComment = await CommentModel.deleteMany({commenterUserId: userId})
    const deleteUserChats = await ChatModel.deleteMany({members: userId})
    const deleteUserMessagesSender = await MessageModel.deleteMany({senderId: userId})
    const deleteUserMessagesReceiver = await MessageModel.deleteMany({receiverId: userId})
    if(deleteUser && deleteUserPost && deleteUserComment && deleteUserChats && deleteUserMessagesSender && deleteUserMessagesReceiver){
        res.status(200).json({message: "Account deleted successfully", deleteUser})
    }
    else{
        res.status(400).json({message: "Account not found or not authorized to delete"})
    }
    }
    catch(error){
        console.log(error);
    }
}
module.exports.randomUsers = async (req, res) => {
    try {
        const users = await User.aggregate([{ $sample: { size: 3 } }]);
        const userDetails = users.map(user => ({
            username: user.username,
            isVip: user.isVip || false
        }));

        // Combine usernames and isVip into a single array of objects
        const response = userDetails.map(user => ({
            username: user.username,
            isVip: user.isVip
        }));

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

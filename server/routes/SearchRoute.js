const express = require('express');
const router = express.Router();
const User = require("../model/User");
const PostModel = require('../model/PostModel');

router.get('/users', async (req, res) => {
    const query = req.query.q;
    try {
        const users = await User.find({ username: { $regex: query, $options: 'i' } });
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/posts', async (req, res) => {
    const query = req.query.q;
    try {
        const posts = await PostModel.find({ $or: [{ title: { $regex: query, $options: 'i' } }, { content: { $regex: query, $options: 'i' } }] });
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;

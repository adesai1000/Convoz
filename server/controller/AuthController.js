const User = require("../model/User");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

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
        // Send user data along with token
        res.status(201).json({ message: "User created successfully.", success: true });
        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: "All Fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "Email is incorrect" });
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
        // Send user data along with token
        res.status(202).json({ message: "User logged in successfully", success: true });
        next();
    } catch (error) {
        console.log(error);
    }
};
module.exports.randomUsers = async (req, res) => {
    try {
      const users = await User.aggregate([{ $sample: { size: 3 } }]);
      const usernames = users.map(user => user.username);
      res.json({ usernames });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
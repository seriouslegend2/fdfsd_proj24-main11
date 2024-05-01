// controllers/UserController.js
const User = require('../models/User');



exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, { username, email, password }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// UserController.js



// Controller function to fetch weekdata of all users
const getAllWeekData = async (req, res) => {
    try {
        const users = await User.find({}, { username: 1, weekdata: 1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller function to fetch monthdata of all users
const getAllMonthData = async (req, res) => {
    try {
        const users = await User.find({}, { username: 1, monthdata: 1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getContestMonthData = async (req, res) => {
    try {
        const users = await User.find({}, { username: 1, monthdata: 1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllWeekData,
    getAllMonthData,
    getContestMonthData
};

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const path = require('path');
const User = require("../models/User");
const updateDailyStreak = require("../middleware/updateDailyStreak");


const app = express.Router();

app.post("/signup", async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword, email });
        await newUser.save();

        console.log("Record Inserted Successfully");
        res.redirect('/');
    } catch (error) {
        console.error('Error:', error.message);

        if (error.name === 'ValidationError') {
            res.status(400).json({ error: error.message });
        } else if (error.code === 11000) {
            res.status(400).json({ error: 'Email must be unique' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

app.post("/signin", updateDailyStreak, async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (isPasswordValid) {
            req.session.userID = user._id; // Set session for user
            user.lastLogin = new Date(); // Update last login date
            await user.save(); // Save user with updated last login date
            res.redirect('/');
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Route to render login.ejs
app.get("/login", (req, res) => {
    res.render('login', { title: "Login", layout: './layouts/authLayout' });
});

// Route to render signin.ejs
app.get("/signin", (req, res) => {
    res.render('signin', { title: "Sign In", layout: './layouts/authLayout' });
});

// Route to render signup.ejs
app.get("/signup", (req, res) => {
    res.render('signup', { title: "Sign Up", layout: './layouts/authLayout' });
});



module.exports = app

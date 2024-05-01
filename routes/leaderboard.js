const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { getTotalProblemsSolved, getTotalPoints } = require('../helper'); // Importing individual functions

// GET leaderboard page
router.get('/leaderboard', async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();

        // Pass the users array to the leadbrd.ejs template
        res.render('leadbrd', { title: "Leaderboard", users: users, helpers: { getTotalProblemsSolved, getTotalPoints } }); // Passing functions as helpers
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

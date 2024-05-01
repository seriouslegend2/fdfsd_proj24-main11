// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Define routes for user operati
router.get('/weekdata', UserController.getAllWeekData);

// Route to fetch monthdata of all users
router.get('/monthdata', UserController.getAllMonthData);

router.get('/monthdata', UserController.getContestMonthData);

// For week data
router.get('/users/:userId/weekdata', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId, 'weekdata');
        res.json(user.weekdata);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// For month data
router.get('/users/:userId/monthdata', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId, 'monthdata');
        res.json(user.monthdata);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/users/:userId/contestmonthdata', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId, 'contestmonthdata');
        res.json(user.contestmonthdata);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
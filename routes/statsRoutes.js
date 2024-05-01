// routes/statsRoutes.js

const express = require('express');
const router = express.Router();
const StatsController = require('../controllers/StatsController');
const { getTotalContestsSolved } = require('../helper'); // Importing individual functions


// Define routes for stats operations
router.get('/monthly-contest-data',getTotalContestsSolved ,StatsController.getMonthlyContestData);
router.get('/daily-problem-data',getTotalContestsSolved, StatsController.getDailyProblemData);



module.exports = router;

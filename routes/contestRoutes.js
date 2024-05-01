// routes/contestRoutes.js
const express = require('express');
const router = express.Router();
const ContestController = require('../controllers/ContestController');

// Define routes for contest operations
router.post('/', ContestController.createContest);
router.get('/:id', ContestController.getContestById);
router.put('/:id', ContestController.updateContest);
router.delete('/:id', ContestController.deleteContest);

module.exports = router;

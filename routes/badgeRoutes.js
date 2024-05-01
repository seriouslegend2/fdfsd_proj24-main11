// routes/badgeRoutes.js
const express = require('express');
const router = express.Router();
const BadgeController = require('../controllers/BadgeController');
const { checkAuth } = require('../middleware/mainware');

// Define routes for user operati
router.get('/', checkAuth, BadgeController.getBadgesByUserId);

// TODO: Use organizerAuthCheck instead of checkAuth middleware.
router.post('/:userId', checkAuth, BadgeController.saveBadgesByUserId);

module.exports = router;
// routes/organizerRoutes.js
const express = require('express');
const router = express.Router();
const OrganizerController = require('../controllers/OrganizerController');

// Define routes for organizer operations
router.post('/register', OrganizerController.registerOrganizer);
router.post('/login', OrganizerController.loginOrganizer);
router.get('/:id', OrganizerController.getOrganizerById);
router.put('/:id', OrganizerController.updateOrganizer);
router.delete('/:id', OrganizerController.deleteOrganizer);

module.exports = router;

// routes/realmRoutes.js
const express = require('express');
const router = express.Router();
const RealmController = require('../controllers/RealmController');

// Define routes for realm operations
router.post('/', RealmController.createRealm);
router.get('/:id', RealmController.getRealmById);
router.put('/:id', RealmController.updateRealm);
router.delete('/:id', RealmController.deleteRealm);

module.exports = router;

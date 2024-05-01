const mongoose = require('mongoose');

const organiserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    realmcreated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Realm' }],
    problemcreated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
    contestcreated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contest' }]
});

const Organiser = mongoose.model('Organiser', organiserSchema);

module.exports = Organiser;

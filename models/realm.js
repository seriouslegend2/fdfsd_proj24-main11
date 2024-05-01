const mongoose = require('mongoose');

const realmSchema = new mongoose.Schema({
    arrcontest: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contest' }],
    arrproblem: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
    text: String
});

const Realm = mongoose.model('Realm', realmSchema);

module.exports = Realm;

const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
    arrproblem: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
    text: String,
    points: Number,
    badge: {
        png: { data: Buffer, contentType: String },
        id: String
    }
});

const Contest = mongoose.model('Contest', contestSchema);

module.exports = Contest;

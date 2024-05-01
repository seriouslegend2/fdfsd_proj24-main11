const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
    userId: String,
    type: String,
    label: String,
    imagePath: String,
});

const Badge = mongoose.model('Badge', badgeSchema);

module.exports = Badge;

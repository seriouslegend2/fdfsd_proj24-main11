const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    question: String,
    testcase: [String], // Array of test cases
    rating: Number,
    points: Number
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;

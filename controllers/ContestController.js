// controllers/ContestController.js
const Contest = require('../models/contest');

exports.createContest = async (req, res) => {
    try {
        const { arrproblem, text, points, badge } = req.body;
        const newContest = new Contest({ arrproblem, text, points, badge });
        const savedContest = await newContest.save();
        res.status(201).json(savedContest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getContestById = async (req, res) => {
    try {
        const { id } = req.params;
        const contest = await Contest.findById(id);
        if (!contest) {
            return res.status(404).json({ error: 'Contest not found' });
        }
        res.status(200).json(contest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateContest = async (req, res) => {
    try {
        const { id } = req.params;
        const { arrproblem, text, points, badge } = req.body;
        const updatedContest = await Contest.findByIdAndUpdate(id, { arrproblem, text, points, badge }, { new: true });
        if (!updatedContest) {
            return res.status(404).json({ error: 'Contest not found' });
        }
        res.status(200).json(updatedContest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteContest = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedContest = await Contest.findByIdAndDelete(id);
        if (!deletedContest) {
            return res.status(404).json({ error: 'Contest not found' });
        }
        res.status(200).json({ message: 'Contest deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

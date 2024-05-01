// controllers/ProblemController.js
const Problem = require('../models/problem');

exports.createProblem = async (req, res) => {
    try {
        const { question, testcase, rating, points } = req.body;
        const newProblem = new Problem({ question, testcase, rating, points });
        const savedProblem = await newProblem.save();
        res.status(201).json(savedProblem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllProblems = async (req, res) => {
    try {
        const problems = await Problem.find();
        res.status(200).json(problems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getProblemById = async (req, res) => {
    try {
        const { id } = req.params;
        const problem = await Problem.findById(id);
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }
        res.status(200).json(problem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, testcase, rating, points } = req.body;
        const updatedProblem = await Problem.findByIdAndUpdate(id, { question, testcase, rating, points }, { new: true });
        if (!updatedProblem) {
            return res.status(404).json({ error: 'Problem not found' });
        }
        res.status(200).json(updatedProblem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProblem = await Problem.findByIdAndDelete(id);
        if (!deletedProblem) {
            return res.status(404).json({ error: 'Problem not found' });
        }
        res.status(200).json({ message: 'Problem deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

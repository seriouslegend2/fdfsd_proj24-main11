// controllers/OrganizerController.js
const Organizer = require('../models/organizer');

exports.registerOrganizer = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newOrganizer = new Organizer({ username, email, password });
        const savedOrganizer = await newOrganizer.save();
        res.status(201).json(savedOrganizer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.loginOrganizer = async (req, res) => {
    try {
        const { username, password } = req.body;
        const organizer = await Organizer.findOne({ username });
        if (!organizer) {
            return res.status(404).json({ error: 'Organizer not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, organizer.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        res.status(200).json({ message: 'Organizer logged in successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getOrganizerById = async (req, res) => {
    try {
        const { id } = req.params;
        const organizer = await Organizer.findById(id);
        if (!organizer) {
            return res.status(404).json({ error: 'Organizer not found' });
        }
        res.status(200).json(organizer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateOrganizer = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;
        const updatedOrganizer = await Organizer.findByIdAndUpdate(id, { username, email, password }, { new: true });
        if (!updatedOrganizer) {
            return res.status(404).json({ error: 'Organizer not found' });
        }
        res.status(200).json(updatedOrganizer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteOrganizer = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrganizer = await Organizer.findByIdAndDelete(id);
        if (!deletedOrganizer) {
            return res.status(404).json({ error: 'Organizer not found' });
        }
        res.status(200).json({ message: 'Organizer deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

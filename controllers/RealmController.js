// controllers/RealmController.js
const Realm = require('../models/realm');

exports.createRealm = async (req, res) => {
    try {
        const { arrcontest, arrproblem, text } = req.body;
        const newRealm = new Realm({ arrcontest, arrproblem, text });
        const savedRealm = await newRealm.save();
        res.status(201).json(savedRealm);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getRealmById = async (req, res) => {
    try {
        const { id } = req.params;
        const realm = await Realm.findById(id);
        if (!realm) {
            return res.status(404).json({ error: 'Realm not found' });
        }
        res.status(200).json(realm);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateRealm = async (req, res) => {
    try {
        const { id } = req.params;
        const { arrcontest, arrproblem, text } = req.body;
        const updatedRealm = await Realm.findByIdAndUpdate(id, { arrcontest, arrproblem, text }, { new: true });
        if (!updatedRealm) {
            return res.status(404).json({ error: 'Realm not found' });
        }
        res.status(200).json(updatedRealm);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteRealm = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRealm = await Realm.findByIdAndDelete(id);
        if (!deletedRealm) {
            return res.status(404).json({ error: 'Realm not found' });
        }
        res.status(200).json({ message: 'Realm deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

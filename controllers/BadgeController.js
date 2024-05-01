const User = require('../models/User');
const Badge = require('../models/badge');

exports.getBadgesByUserId = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(404).json({error: 'Invalid user'});
    }

    return res.status(200).json({badges: user.badges});
};

exports.saveBadgesByUserId = async (req, res) => {
    const userId = req.params.userId;
    if (userId === undefined) {
        return res.status(400).json({error: 'No userId'});
    }

    const badges = req.body.badges;
    if (badges === undefined) {
        return res.status(400).json({error: 'Badges not provided'});
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.status(400).json({error: 'Bad userId'});
    }

    badges.forEach(badge => user.badges.push(badge));
    await user.save();

    return res.status(200);
};
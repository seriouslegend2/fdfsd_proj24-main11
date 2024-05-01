const User = require('../models/User');

const updateDailyStreak = async (req, res, next) => {
    try {
        if (req.session && req.session.userId) {
            const user = await User.findById(req.session.userId);

            // Get today's date and yesterday's date
            const today = new Date().toDateString();
            const yesterday = new Date(Date.now() - 86400000).toDateString(); 
            // If last login date is yesterday, increment streak
            if (user.lastLogin && user.lastLogin.toDateString() === yesterday) {
                user.dailyStreak++;
            } else if (user.lastLogin && user.lastLogin.toDateString() !== yesterday) {
                // If last login date is not today, reset streak to 0
                user.dailyStreak = 0;
            }

            user.lastLogin = new Date(); // Update last login date
            await user.save();
        }
    } catch (error) {
        console.error("Error updating daily streak:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
    next(); 
};

module.exports = updateDailyStreak;

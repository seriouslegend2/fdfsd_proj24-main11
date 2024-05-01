 // Assuming your Mongoose model is defined in userModel.js

const User = require("../models/User");

async function addValuesToDay(username, dayName, values) {
    try {
        // Find the user document
        let user = await User.findOne({ username: username });
        if (!user) {
            throw new Error("User not found.");
        }

        // Check if the day name is valid
        if (!(dayName in user.weekdata.toObject())) {
            throw new Error("Invalid day name.");
        }

        // Add values to the day's array
        user.weekdata[dayName].push(...values);
        

        // Save the updated user document
        await user.save();

        console.log(`Values added to ${dayName}.`);
    } catch (error) {
        console.error("Error adding values to day:", error);
    }
}



async function addValuesToMonth(username, monthName, values) {
    try {
        // Find the user document
        let user = await User.findOne({ username: username });
        if (!user) {
            throw new Error("User not found.");
        }

        // Check if the month name is valid
        if (!(monthName in user.monthdata.toObject())) {
            throw new Error("Invalid month name.");
        }

        // Add values to the month's array
        user.monthdata[monthName].push(...values);

        // Save the updated user document
        await user.save();

        console.log(`Values added to ${monthName}.`);
    } catch (error) {
        console.error("Error adding values to month:", error);
    }
}

async function addContestValuesToMonth(username, monthName, values) {
    try {
        // Find the user document
        let user = await User.findOne({ username: username });
        if (!user) {
            throw new Error("User not found.");
        }

        // Check if the month name is valid
        if (!(monthName in user.contestmonthdata.toObject())) {
            throw new Error("Invalid month name.");
        }

        // Add values to the month's array
        user.contestmonthdata[monthName].push(...values);

        // Save the updated user document
        await user.save();

        console.log(`Values added to ${monthName}.`);
    } catch (error) {
        console.error("Error adding values to month:", error);
    }
}

module.exports = {
    addValuesToMonth,addValuesToDay,addContestValuesToMonth
};


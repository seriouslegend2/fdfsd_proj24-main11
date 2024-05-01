function getTotalProblemsSolved(monthdata) {
    let total = 0;
    for (let month in monthdata) {
        // Check if monthdata[month] is an array
        if (Array.isArray(monthdata[month])) {
            total += monthdata[month].length; // Add the length of the array
        } else {
            // Check if the value is a valid number
            const value = parseInt(monthdata[month]);
            if (!isNaN(value)) {
                total += value; // Add the value to the total
            }
        }
    }
    return total;
}

function getTotalContestsSolved(monthdata) {
    let total = 0;
    for (let month in monthdata) {
        // Check if monthdata[month] is an array
        if (Array.isArray(monthdata[month])) {
            total += monthdata[month].length; // Add the length of the array
        } else {
            // Check if the value is a valid number
            const value = parseInt(monthdata[month]);
            if (!isNaN(value)) {
                total += value; // Add the value to the total
            }
        }
    }
    return total;
}


function getTotalPoints(user) {
    const totalProblemsSolved = getTotalProblemsSolved(user.monthdata);
    const totalContestsAttended = getTotalContestsSolved(user.contestmonthdata);
    return (totalProblemsSolved * 10) + (totalContestsAttended * 15); // Ensure the result is an integer
}


module.exports = { getTotalProblemsSolved, getTotalPoints };

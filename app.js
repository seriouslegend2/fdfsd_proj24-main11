const express = require("express");
const session = require('express-session');
const expressEjsLayouts = require("express-ejs-layouts");
const authroutes = require("./routes/authroutes");
const useroutes = require("./routes/userRoutes");
const badgesRoutes = require("./routes/badgeRoutes");
const mongoose = require("mongoose");
const { checkAuth } = require("./middleware/mainware");
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const User = require('./models/User'); // Import the User model
const updateDailyStreak = require("./middleware/updateDailyStreak");
const { addValuesToDay,addValuesToMonth, addContestValuesToMonth } = require("./middleware/jugaad");
const leaderboardRouter = require('./routes/leaderboard');



const app = express();
const port = 3030;
app.use(bodyParser.json());

app.use(session({
    secret: 'Ballaya',
    resave: false,
    saveUninitialized: false
}));

mongoose.connect('mongodb://localhost:27017/codeRealmsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.on('error', () => console.log("Error in connecting to the database"));
db.once('open', () => console.log("Connected to the database"));

//Static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/imgs', express.static(__dirname + '/public/imgs'));
app.use('/videos', express.static(__dirname + '/public/videos'));

app.use(expressEjsLayouts);
app.set('layout', './layouts/mainLayout');
app.set("view engine", 'ejs');
app.use(express.urlencoded({
    extended: true
}));

const renderPage = (route, file, props) => {
    app.get(route, checkAuth, async (req, res) => {
        try {
            
            res.render(file, { ...props, user: req.user });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });
};

renderPage('/', 'index', {
    title: 'Home',
});

renderPage('/stats', 'stats', {
    title: 'Stats',
});

renderPage('/contactus', 'contatus', {
    title: 'Contact Us',
});

// renderPage('/leaderboard', 'leadbrd', {
//     title: 'Leaderboard',
// });

renderPage('/editdata', 'editdata', {
    title: 'Edit data',
});


app.post('/sendemail', async (req, res) => {
    const { name, email: senderEmail, userId, message } = req.body;

    try {
        // Fetch the user by username
        const user = await User.findById(userId); // Change 'kaushal' to appropriate username
        if (!user) throw new Error('User not found'); // Handle if user not found

        const recipientEmail = user.email; // Get the email of the user

        // Create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kaushaledara22@gmail.com',
                pass: 'ezol ybtu kcnb wyki'
            }
        });

        // Setup email data with unicode symbols
        let mailOptions = {
            from: 'kaushaledara22@gmail.com',
            to: recipientEmail, // Use the dynamically fetched recipient's email
            subject: 'New Contact Form Submission',
            text: `Name: ${name}\nSender's Email: ${senderEmail}\nMessage: ${message}`
        };

        // Send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                return res.status(500).json({ success: false, message: 'Failed to send email' });
            }
            res.status(200).json({ success: true, message: 'Email sent successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// Route to handle registration form submission
app.post('/edit-profile', checkAuth, async (req, res) => {
    try {
        // Find the user by their ID
        const user = await User.findById(req.user._id);
        console.log(req.body);
        // Update the user's details with data from the form
        user.address = req.body.address || user.address;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
        user.instagramLink = req.body.instagramLink || user.instagramLink;
        user.linkedinLink = req.body.linkedinLink || user.linkedinLink;
        user.twitterLink = req.body.twitterLink || user.twitterLink;
        user.name = req.body.name || user.name;
        user.type = req.body.type || user.type;
        user.college = req.body.college || user.college;

        user.aboutme.bio = req.body.aboutme.bio || user.aboutme.bio;
        const experience = req.body.aboutme.experience.filter(x => x);
        if (experience.length !== 0) user.aboutme.experience = experience;

        const education = req.body.aboutme.education.filter(x => x);
        if (education.length !== 0) user.aboutme.education = education;

        const skills = req.body.skills.filter(skill => skill.title && skill.description).map(skill => ({ title: skill.title, description: skill.description }));
        if (skills.length !== 0) user.skills = skills;

        console.log(req.body.aboutme);
        // console.log(user);
        
        // Save the updated user details
        await user.save();
        console.log(user.skills);

        res.redirect('/'); // Redirect to a success page or any other page
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.put('/users/:userId/update-avatar', async (req, res) => {
    const userId = req.params.userId;
    const { avatarPath } = req.body;

    try {
        const user = await User.findByIdAndUpdate(userId, { avatarPath }, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Avatar updated successfully' });
    } catch (error) {
        console.error('Error updating avatar:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.use(authroutes);
app.use('/', leaderboardRouter);
app.use(useroutes);
app.use('/badges', badgesRoutes);

app.use(updateDailyStreak);

//  // Import the function

// // Example usage
 //const username = 'abhiram';
// addValuesToDay(username, "monday", [6, 9, 2]);

// // Add values to Tuesday
// addValuesToDay(username, "tuesday", [15, 25]);

// // Add values to Wednesday
// addValuesToDay(username, "wednesday", [1]);

// // Add values to Thursday
// addValuesToDay(username, "thursday", [4, 5]);

// // Add values to Friday
// addValuesToDay(username, "friday", [14, 52, 44]);

// // Add values to Saturday
// addValuesToDay(username, "saturday", [4, 5]);

// // Add values to Sunday
// addValuesToDay(username, "sunday", [4, 5,6 ,7]);

// // Add values to January
// addValuesToMonth(username, "january", [1, 2, 3, 4, 5, 6, 7, 8, 96, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);

// // Add values to February (considering 28 days)
// addValuesToMonth(username, "february", [31, 28, 27, 26, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);

// // Add values to March
// addValuesToMonth(username, "march", [15, 20, 25, 30, 35, 40, 45, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165]);

// // Add values to April
// addValuesToMonth(username, "april", [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 5585, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150]);

// // Add values to May
// addValuesToMonth(username, "may", [40, 35, 30, 25, 20, 15, 10, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]);

// // Add values to June
// addValuesToMonth(username, "june", [5, 10, 15, 20, 25, 5, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150]);

// // Add values to July
// addValuesToMonth(username, "july", [150, 140, 130, 120, 110, 100, 90, 80, 70,  10, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

// // Add values to August
// addValuesToMonth(username, "august", [25, 50, 75, 100, 125,  275, 300, 325, 350, 375, 400, 425, 450, 475, 500, 525, 550, 575, 600, 625, 650, 675, 700, 725, 750]);

// // Add values to September
// addValuesToMonth(username, "september", [5, 10, 15,  50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150]);

// // Add values to October
// addValuesToMonth(username, "october", [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361,  625, 676, 729, 784, 841, 900]);

// // Add values to November
// addValuesToMonth(username, "november", [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65,  100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150]);

// // Add values to December
// addValuesToMonth(username, "december", [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15,  10, 15, 20, 25, 30, 35, 40, 45]);

// // Add values to January
// addContestValuesToMonth(username, "january", generateRandomValues());

// // Add values to February
//addContestValuesToMonth(username, "february", [21,1,4]);

// // Add values to March
// addContestValuesToMonth(username, "march", generateRandomValues());

// // Add values to April
// addContestValuesToMonth(username, "april", generateRandomValues());

// // Add values to May
// addContestValuesToMonth(username, "may", generateRandomValues());

// // Add values to June
// addContestValuesToMonth(username, "june", generateRandomValues());

// // Add values to July
 //addContestValuesToMonth(username, "july", [4,7,9]);

// // Add values to August
// addContestValuesToMonth(username, "august", generateRandomValues());

// // Add values to September
// addContestValuesToMonth(username, "september", generateRandomValues());

// // Add values to October
// addContestValuesToMonth(username, "october", generateRandomValues());

// // Add values to November
// addContestValuesToMonth(username, "november", generateRandomValues());

// // Add values to December
// addContestValuesToMonth(username, "december", generateRandomValues());

// Function to generate random values
// function generateRandomValues() {
//     const values = [];
//     const maxValues = Math.floor(Math.random() * 7); // Random number between 0 and 6
//     for (let i = 0; i < maxValues; i++) {
//         values.push(Math.floor(Math.random() * 101)); // Random number between 0 and 100
//     }
//     return values;
// }

app.get('/api/user/weekdata', async (req, res) => {
    try {
      const userId = req.session.userID; // Retrieve userId from session
      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user.weekdata); // Send weekdata as response
    } catch (error) {
      console.error('Error fetching week data:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Route to retrieve month data
app.get('/api/user/monthdata', async (req, res) => {
    try {
      const userId = req.session.userID; // Retrieve userId from session
      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user.monthdata); // Send monthdata as response
    } catch (error) {
      console.error('Error fetching month data:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/user/contestmonthdata', async (req, res) => {
    try {
      const userId = req.session.userID; // Retrieve userId from session
      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user.contestmonthdata); // Send monthdata as response
    } catch (error) {
      console.error('Error fetching month data:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

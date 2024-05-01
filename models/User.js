const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
       
    },
    lastLogin: {
        type: Date
    },
    dailyStreak: {
        type: Number,
        default: 0
    },
    phoneNumber: {
        type: String,
        
    },
    instagramLink: {
        type: String,
        
    },
    linkedinLink: {
        type: String,
      
    },
    twitterLink: {
        type: String,
       
    },
    name: {
        type: String,
       
    },
    type: {
        type: String,
       
    },
    college: {
        type: String,
       
    },
    avatarPath: {
        type: String,
        default: '/imgs/avatars/memo_3.png' // Default avatar path
    },
    aboutme: {
        bio: {
            type: String,
           
        },
        experience: [{
            type: String,
           
        }],
        education: [{
            type: String,
           
        }]
    },
    skills: [{
        title: {
            type: String,
           
        },
        description: {
            type: String,
           
        }
    }],
    realmIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Realm' }],
    arrproblem: [{
        problemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Problem'
        },
        points: {
            type: Number,
            default: 0
        }
    }],
    arrcontest: [{
        contestId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Contest'
        },
        points: {
            type: Number,
            default: 0
        }
    }],

    weekdata: {
        monday: [Number],
        tuesday: [Number],
        wednesday: [Number],
        thursday: [Number],
        friday: [Number],
        saturday: [Number],
        sunday: [Number]
    },
    
   monthdata:{
        january: [Number],
        february: [Number],
        march: [Number],
        april: [Number],
        may: [Number],
        june: [Number],
        july: [Number],
        august: [Number],
        september: [Number],
        october: [Number],
        november: [Number],
        december: [Number]
    },

    contestmonthdata:{
        january: [Number],
        february: [Number],
        march: [Number],
        april: [Number],
        may: [Number],
        june: [Number],
        july: [Number],
        august: [Number],
        september: [Number],
        october: [Number],
        november: [Number],
        december: [Number]
    },
    badges: [{ kind: String, label: String, image: String }],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlwngth: 3
    },
    joined: {
        type: Date,
        default: Date.now
    },
    gamesPlayed: {
        type: Number,
        default: 0
    },
    gamesWon: {
        type: Number,
        default: 0
    },
    gamesLost: {
        type: Number,
        default: 0
    },
    highestScore: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
const User = mongoose.model('User', userSchema);
module.exports = User;
// Create user schema in mongoose
const mongoose = require('mongoose');   

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    // timestamp in mongo
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    }

    
});

// create model(collection)
const User = mongoose.model('User', userSchema);

module.exports = User;
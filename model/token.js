const mongoose = require('mongoose');
const schema = mongoose.Schema

const tokenSchema = new schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 3600
    }
});

module.exports = mongoose.model('Token', tokenSchema);
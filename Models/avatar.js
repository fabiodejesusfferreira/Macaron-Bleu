const { Schema, model } = require('mongoose');
const { randomUUID } = require('crypto')

const avatarSchema = new Schema({
    uniqueId: {
        type: String,
        default: randomUUID()
    },

    userId: {
        type: String
    },

    targetId: {
        type: String,
    },

    messageId: {
        type: String,
        required: true,
        unique: true
    },
});

module.exports = model('avatar', avatarSchema);
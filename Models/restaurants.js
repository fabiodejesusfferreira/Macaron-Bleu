const { Schema, model } = require('mongoose');
const { randomUUID } = require('crypto')

const restaurantsSchema = new Schema({
    uniqueId: {
        type: String,
        default: randomUUID()
    },

    owner: {
        username: String,
        id: String,
        avatarURL: String
    },

    restaurantInfo: {
        name: String,
        slogan: String,
        logo: String,
        color: String,
        nationality: String,
        rating: String,
        hourly_expenses: Number
    },

    stock: []
});

module.exports = model('restaurants', restaurantsSchema);
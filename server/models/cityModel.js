const mongoose = require('mongoose');

// create schema
const citySchema = mongoose.Schema(
    {
        cityId: {
            type: String
        },
        cityName: {
            type: String
        },
        actual_location: String,
        location: {
            lat: {type: Number},
            lng: {type: Number}
        },
        weight: {
            type: Number
        },
    },
    {
        timestamps: true,
    }
);

const City = mongoose.model('City', citySchema);

module.exports = City;
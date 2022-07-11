const mongoose = require('mongoose');

// create schema
const postSchema = mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        title: {
            type: String
        },
        content: String,
        location: String,
        // userId have not implement
        geo: {
            lat: {type: Number},
            lng: {type: Number}
        },
        photos: {
            type: Number
        },
        date: Date,
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model('Post', postSchema);

module.exports = City;
const mongoose = require('mongoose');

// create schema
const postSchema = mongoose.Schema(
	{
		title: {
			type: String,
		},
		content: String,
		photos: [],
		userId: {
			type: mongoose.Schema.Types.ObjectId,
		},
		username: {
			type: String,
		},
		cityId: {
			type: mongoose.Schema.Types.ObjectId,
		},
		cityname: String,
		likes: Number,
	},
	{
		timestamps: true,
	}
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

/*
postId: '', // use mongodb default __id
cityId: '',
userId: '',
title: '',
content: '',
photos: [],
likes: 0,
create_date: '',
*/

// const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
const Post = require('../models/postModel');
const asyncHandler = require('express-async-handler');

// @des Get posts
// @route GET /posts
// @access Private
const getPosts = asyncHandler(async (req, res) => {
	const posts = await Post.find();
	return res.status(200).send(posts);
});

// @des get post list by city id, sorted by date from new to old
// @route GET /posts/:cityId
// @access Private
const getPostsByCityId = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `get post${req.params.id}` });
});

// @des get post list by user id, sorted by date from new to old
// @route GET /posts/:userId
// @access Private
const getPostsByUserId = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `get post${req.params.id}` });
});

// @des Get post
// @route GET /posts/:userId
// @access Private
const getPostById = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `get post${req.params.id}` });
});

// @des Add post
// @route POST /posts
// @access Private
const addPost = asyncHandler(async (req, res) => {
	try {
		let newPost = {
			title: '',
			content: '',
			photos: [],
			userId: '',
			username: '',
			cityId: '',
			cityname: '',
			likes: 0,
		};
		if (!req.body.title) {
			return res.status(400).send({ message: 'Post must have a title!' });
		} else if (!req.body.content) {
			return res.status(400).send({ message: 'Post must have content!' });
		}
		newPost.title = req.body.title;
		newPost.content = req.body.content;
		req.body.photos.forEach((i) => {
			newPost.photos.push(i);
		});
		newPost.userId = req.body.userId;
		newPost.username = req.body.username;
		newPost.cityId = req.body.cityId;
		newPost.cityname = req.body.cityname;
		// console.log("newPost");
		// console.log(newPost);
		
		const resPost = await Post.create(newPost);
		console.log(resPost);
		return res.status(200).send(resPost);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		console.log(message);
		// return thunkAPI.rejectWithValue(message)
	}
});

// @des Update post
// @route PUT /posts/:id
// @access Private
const updatePost = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `update post${req.params.id}` });
});

// @des Delete post
// @route DELETE /posts/:cityId/:postID
// @access Private
const deletePost = asyncHandler(async (req, res) => {
	const foundCity = await City.find({ cityId: req.params.cityId });
	if (foundCity.length == 0) res.status(404).send({ message: 'city not found' });
	const prevLen = foundCity[0].posts.length;
	console.log(prevLen);
	foundCity[0].posts = foundCity[0].posts.filter((post) => {
		return post.postID !== req.params.postID;
	});
	const newLen = foundCity[0].posts.length;
	if (prevLen == newLen) {
		res.status(404).send({ message: 'post not found' });
	} else {
		foundCity[0].weight = foundCity[0].posts.length;
	}
	console.log(newLen);
	await foundCity[0].save();

	res.status(200).json(
		{ message: `delete post in cityId: ${req.params.cityId} for postID: ${req.params.postID}` },
		{ cityId: req.params.cityId },
		{ postID: req.params.postID }
	);
});

module.exports = {
	getPosts,
	getPostsByCityId,
	getPostsByUserId,
	getPostById,

	addPost,
	updatePost,
	deletePost,
};

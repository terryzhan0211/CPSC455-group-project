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
// @route GET /posts/byCity/:cityId
// @access Private
const getPostsByCityId = asyncHandler(async (req, res) => {
	const foundPosts = await Post.find({ cityId: req.params.cityId }).sort({ createdAt: 'desc' });
	return res.status(200).send(foundPosts);
});

// @des get post list by user id, sorted by date from new to old
// @route GET /posts/byUser/:userId
// @access Private
const getPostsByUserId = asyncHandler(async (req, res) => {
	const foundPosts = await Post.find({ _id: req.params.userId }).sort({
		createdAt: 'desc',
	});
	return res.status(200).send(foundPosts);
});

// @des Get post
// @route GET /posts/:postId
// @access Private
const getPostById = asyncHandler(async (req, res) => {
	const foundPosts = await Post.find({ _id: req.params.postId });
	return res.status(200).send(foundPosts);
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
		newPost.userId = req.user._id;
		newPost.username = req.user.username;
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
// @route DELETE /posts/likes/inc/:postId
// @access Private
// return deletedCound 0 as fail, 1 as success
const deletePost = asyncHandler(async (req, res) => {
	await Post.deleteOne({ _id: req.params.postId });
	return res.status(200).send({ _id: req.params.postId });
});

// @des increase single post like count by post id
// @route PUT /posts/likes/inc/:postId
// @access Private
const incPostLikes = asyncHandler(async (req, res) => {
	const updPost = await Post.updateOne({ _id: req.params.postId }, { $inc: { likes: 1 } });
	return res.status(200).send(updPost);
});

// @des decrease single post like count by post id
// @route PUT /posts/likes/dec/:postId
// @access Private
const decPostLikes = asyncHandler(async (req, res) => {
	const updPost = await Post.updateOne({ _id: req.params.postId }, { $inc: { likes: -1 } });
	return res.status(200).send(updPost);
});

// @des sort post list by like counts
// @route GET /posts/sort/likes
// @access Private
const sortPostByLikes = asyncHandler(async (req, res) => {
	const sortedPosts = await Post.find({ cityId: req.params.cityId }).sort({ likes: 'desc' });
	return res.status(200).send(sortedPosts);
});

// @des sort post list by dates
// @route GET /posts/sort/date
// @access Private
const sortPostByDate = asyncHandler(async (req, res) => {
	const sortedPosts = await Post.find({ cityId: req.params.cityId }).sort({ createdAt: 'desc' });
	return res.status(200).send(sortedPosts);
});

module.exports = {
	getPosts,
	getPostsByCityId,
	getPostsByUserId,
	getPostById,

	addPost,
	updatePost,
	deletePost,

	incPostLikes,
	decPostLikes,

	sortPostByLikes,
	sortPostByDate,
};

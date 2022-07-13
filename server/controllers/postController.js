// const axios = require('axios').default;
const {v4 : uuidv4} = require('uuid')
const City = require('../models/cityModel')
const asyncHandler = require('express-async-handler')

const getCities = asyncHandler(async (req,res) => {
    const cities = await City.find();
    // console.log(cities);
    return res.status(200).send(cities);
})

// @des Get posts
// @route GET /posts
// @access Private
const getPosts = asyncHandler(async (req,res) => {
    return res.status(200).send(INITIAL_STATE);
})

// @des Get post
// @route GET /posts/:id
// @access Private
const getPost = asyncHandler(async (req,res) => {
    res.status(200).json({message:`get post${req.params.id}`})
})

// @des Add post
// @route POST /posts
// @access Private
const addPost = asyncHandler(async (req,res) => {
    try {
        let newPost = {
            postID: uuidv4(),
            title: '',
            content: '',
            location: '',
            geo: '',
            photos: [],
            username: '',
            date: new Date(),
            cityId: '',
        };
        if (!req.body.title) {
            return res.status(400).send({ message: 'Post must have a title!' })
        } else if (!req.body.content) {
            return res.status(400).send({ message: 'Post must have content!' })
        } else if (!req.body.location) {
            return res.status(400).send({ message: 'Post must have location!' })
        }
        newPost.title = req.body.title;
		newPost.content = req.body.content;
		newPost.location = req.body.location;
        newPost.geo = req.body.geo;
		newPost.username = req.body.username;
		req.body.photos.forEach((i) => {
			newPost.photos.push(i);
		});
        // console.log("newPost");
        // console.log(newPost);
        const newCityname = newPost.location.slice(0, newPost.location.search(","));
        const foundCity = await City.find({cityName: newCityname});
        if (foundCity.length == 0) {
            const newCity = {
                cityId: uuidv4(),
                cityName: newCityname,
                actual_location: newPost.location,
                location: newPost.geo,
                weight: 1,
                // posts: [newPost],
            }
            newPost.cityId = newCity.cityId;
            newCity.posts = [newPost];
            await City.create(newCity);
        } else {
            newPost.cityId = foundCity[0].cityId;
            foundCity[0].posts.push(newPost);
            foundCity[0].weight++;
            await foundCity[0].save();
        }
        console.log(newPost);
        return res.status(200).send(newPost);
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        console.log(message);
        // return thunkAPI.rejectWithValue(message)
    }
})

// @des Update post
// @route PUT /posts/:id
// @access Private
const updatePost = asyncHandler(async (req,res) => {
    res.status(200).json({message:`update post${req.params.id}`})
})

// @des Delete post
// @route DELETE /posts/:cityId/:postID
// @access Private
const deletePost = asyncHandler(async (req,res) => {
    const foundCity = await City.find({cityId: req.params.cityId});
    if (foundCity.length == 0) res.status(404).send({message: 'city not found'});
    const prevLen = foundCity[0].posts.length;
    console.log(prevLen);
    foundCity[0].posts = foundCity[0].posts.filter((post) => {
        return post.postID !== req.params.postID;
    })
    const newLen = foundCity[0].posts.length;
    if (prevLen == newLen) {
        res.status(404).send({message: 'post not found'});
    } else {
        foundCity[0].weight = foundCity[0].posts.length;
    }
    console.log(newLen);
    await foundCity[0].save();

    res.status(200).json({message:`delete post in cityId: ${req.params.cityId} for postID: ${req.params.postID}`}, {cityId: req.params.cityId}, {postID: req.params.postID});
})

module.exports = {
    getCities,
    getPosts,
    getPost,
    addPost,
    updatePost,
    deletePost
}
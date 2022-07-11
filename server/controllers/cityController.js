// const axios = require('axios').default;
const {v4 : uuidv4} = require('uuid')
const City = require('../models/cityModel')
const asyncHandler = require('express-async-handler')

const getCities = asyncHandler(async (req,res) => {
    const cities = await City.find();
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
            date: new Date(),
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
        // req.body.photos.forEach((i) => {req.body.photos.push(i)});
        newPost.photos = req.body.photos;
        console.log("newPost");
        console.log(newPost);
        const newCityname = newPost.location.slice(0, newPost.location.search(","));
        const foundCity = INITIAL_STATE.cities.find(city => city.cityName === newCityname);
        if (!foundCity) {
            const newCity = {
                cityId: uuidv4(),
                cityName: newCityname,
                actual_location: newPost.location,
                location: newPost.geo,
                weight: 1,
                posts: [newPost],
            }
            INITIAL_STATE.cities.push(newCity);
        } else {
            foundCity.posts.push(newPost);
            foundCity.weight++;
        }
        // cities[action.payload.city].posts.push(newPost);
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
const updatePost =asyncHandler(async (req,res) => {
    res.status(200).json({message:`update post${req.params.id}`})
})

// @des Delete post
// @route DELETE /posts/:id
// @access Private
const deletePost = asyncHandler(async (req,res) => {
    res.status(200).json({message:`delete post${req.params.id}`})
})

module.exports = {
    getCities,
    getPosts,
    getPost,
    addPost,
    updatePost,
    deletePost
}
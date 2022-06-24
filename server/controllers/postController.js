const asyncHandler = require('express-async-handler')

// @des Get posts
// @route GET /posts
// @access Private
const getPosts = asyncHandler(async (req,res) => {
    res.status(200).json({message:'get posts'})
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
    res.status(200).json({message:'add post'})
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
    getPosts,
    getPost,
    addPost,
    updatePost,
    deletePost
}
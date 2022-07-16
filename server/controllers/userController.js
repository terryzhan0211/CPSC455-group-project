const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { post } = require('../routes')

// @desc    Register new user
// @route   POST /users
// @access  Public
const registerUser = asyncHandler(async(req,res) => {
    const { username, password } = req.body

    if (!username || !password) {
        res.status(400)
        throw new Error('Some field missing')
    }

    const userExists = await User.findOne({ username })

    if (userExists) {
        res.status(400)
        throw new Error('Username already registered, find a new one please')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        username: username,
        password: hashedPassword,
        introduction:"I love GO-Travel",
        likedPosts: []
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            introduction: user.introduction,
            likedPosts: user.likedPosts,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


// @desc    Authenticate a user
// @route   POST /users/login
// @access  Public
const login = asyncHandler(async(req,res) => {
    const {username, password } = req.body

    const user = await User.findOne({ username })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            username: user.username,
            introduction: user.introduction,
            likedPosts: user.likedPosts,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Incorrect username or password')
    }
})

// @desc    Get user data
// @route   GET /users/me
// @access  Private
const getMe = asyncHandler(async(req,res) => {
    res.status(200).json(req.user)
})

// @desc    Edit user data
// @route   PUT /users/me
// @access  Private
const editUser = asyncHandler(async (req, res) => {
    const { id, username, introduction } = req.body
    const user = await User.findById(id)
    
    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }

    const userExists = await User.findOne({ username })

    if (userExists && user.username !== username) {
        res.status(400)
        throw new Error('Username already registered, find a new one please')
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    })

    res.json({
        _id: updatedUser.id,
        username: updatedUser.username,
        introduction: updatedUser.introduction,
        likedPosts: updatedUser.likedPosts,
        token: generateToken(updatedUser._id),
    })

  })

// @desc    Like a post
// @route   PUT/users/likePost
// @access  Private
const editLikedPost = asyncHandler(async (req, res) => {
    const { userid, postid } = req.body
    const user = await User.findById(userid)
    
    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }

    currLikedPost = user.likedPosts
    const liked = currLikedPost.filter(
        (post) => post == postid
    )

    if(liked.length !== 0){
        currLikedPost = currLikedPost.filter(
            (post) => post !== postid)
    }else{
        currLikedPost.push(postid)
    }

    const updatedUser = await User.findByIdAndUpdate(userid, {likedPosts:currLikedPost}, {
      new: true,
    })

    res.json({
        likedPosts: updatedUser.likedPosts,
        token: generateToken(updatedUser._id),
    })

  })

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

// const likePost=()=>(async (req, res, next) => {
// 	if (!req.body) {
// 		return res.status(400).send({ message: 'likePost must not be undefined' });
// 	}
//     let userNameAndpostID={
//         username:req.body.username,
//         postID:req.body.postID
//     }
    
// 	await User.updateOne(  { username: userNameAndpostID.username }, { $addToSet: { likedPosts: userNameAndpostID.postID } });
// 	return res.send(userNameAndpostID);
// });

module.exports = {
    registerUser,
    login,
    getMe,
    editUser,

    editLikedPost

}
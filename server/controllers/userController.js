const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

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
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
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
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('A-oh something is not correct')
    }
})

// @desc    Get user data
// @route   GET /users/me
// @access  Private
const getMe = asyncHandler(async(req,res) => {
    res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    login,
    getMe,
}
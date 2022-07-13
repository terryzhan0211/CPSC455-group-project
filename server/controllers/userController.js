const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
// const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({message:"registerUser"})
})

// @desc    Authenticate a user
// @route   POST /users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    res.status(200).json({message:"loginUser"})
})

// @desc    Get user data
// @route   GET /users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json({message:"getMe"})
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}
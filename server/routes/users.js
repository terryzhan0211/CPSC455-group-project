const express = require('express')
const router = express.Router()
const {
  registerUser,
  login,
  getMe,
} = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

router.post('/signup', registerUser)
router.post('/login', login)
router.get('/me', protect, getMe)

module.exports = router

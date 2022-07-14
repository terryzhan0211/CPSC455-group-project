const express = require('express')
const router = express.Router()
const {
  registerUser,
  login,
  getMe,
  editUser
} = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

router.post('/signup', registerUser)
router.post('/login', login)
router.get('/me', protect, getMe)
router.post('/me', protect, editUser)

module.exports = router

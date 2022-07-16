const express = require('express')
const router = express.Router()
const {
  registerUser,
  login,
  getMe,
  editUser,

  editLikedPost

} = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

router.post('/signup', registerUser)
router.post('/login', login)
router.get('/me', protect, getMe)

router.put('/me', protect, editUser)
router.put('/likePost',protect, editLikedPost)

module.exports = router

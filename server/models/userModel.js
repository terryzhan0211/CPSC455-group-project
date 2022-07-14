const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please chose an user name'],
    },
    password: {
      type: String,
      required: [true, 'Now input your password -- keep it secret'],
    },
    introduction: {
      type: String,
    },
      likedPosts: {
        type: []
      }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)

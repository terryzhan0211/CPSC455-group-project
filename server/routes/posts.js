const express = require('express');
const router = express.Router();
const { getPosts,getPostById,addPost,updatePost,deletePost } = require('../controllers/postController')

/* GET posts listing. */
router
    .route('/')
    .get(getPosts)
    .post(addPost)
// get one specific post
router
    .route('/:id')
    .get(getPostById)
    .put(updatePost)
  
router.route('/:cityId/:postID').delete(deletePost);

module.exports = router;
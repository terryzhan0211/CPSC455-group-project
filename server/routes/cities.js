const express = require('express');
const router = express.Router();
const { getPosts,getPost,addPost,updatePost,deletePost, getCities } = require('../controllers/postController')

/* GET posts listing. */
router
    .route('/')
    .get(getCities)
    .get(getPosts)
    .post(addPost)
// get one specific post
router
    .route('/:id')
    .get(getPost)
    .put(updatePost)
  
router.route('/:cityId/:postID').delete(deletePost);

module.exports = router;
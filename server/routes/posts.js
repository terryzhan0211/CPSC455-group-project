const express = require('express');
const router = express.Router();
const { getPosts,getPost,addPost,updatePost,deletePost } = require('../controllers/postController')

/* GET users listing. */
router
    .route('/')
    .get(getPosts)
    .post(addPost)

router
    .route('/:id')
    .get(getPost)
    .put(updatePost)
    .delete(deletePost)


module.exports = router;
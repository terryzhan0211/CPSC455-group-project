const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')
const { getPosts, getPostsByCityId, getPostsByUserId, getPostById,addPost,
    updatePost, deletePost, incPostLikes, decPostLikes, sortPostByLikes,
    sortPostByDate } = require('../controllers/postController')

/* GET posts listing. */
router
    .route('/')
    .get(getPosts)
    .post(protect, addPost)
// get one specific post
router
    .route('/:postId')
    .get(getPostById)
    .put(updatePost)
    .delete(deletePost)

router.route('/byCity/:cityId').get(getPostsByCityId);
router.route('/byUser/:userId').get(getPostsByUserId);

router.route('/likes/inc/:postId').put(incPostLikes);
router.route('/likes/dec/:postId').put(decPostLikes);

router.route('/sort/likes').get(sortPostByLikes);
router.route('/sort/date').get(sortPostByDate);

module.exports = router;
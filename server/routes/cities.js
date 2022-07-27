const express = require('express');
const router = express.Router();
const { addCity,reduceWeight, getCities } = require('../controllers/cityController')

/* GET posts listing. */
router
    .route('/req/')
    .get(getCities)
    .post(addCity)
    .delete(reduceWeight)
// get one specific post
// router
//     .route('/:id')
//     .get(getPost)
//     .put(updatePost)

module.exports = router;
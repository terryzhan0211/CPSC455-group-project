const express = require('express');
const router = express.Router();
const { getCityByLocation,reduceWeight, getCities } = require('../controllers/cityController')

/* GET posts listing. */
router
    .route('/req/')
    .get(getCities)
    .post(getCityByLocation)
    .put(reduceWeight)

module.exports = router;
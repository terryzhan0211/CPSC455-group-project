const express = require('express');
const router = express.Router();
const { getCityByLocation, reduceWeight, getCities, getCityNameById, handleSearch } = require('../controllers/cityController');

/* GET posts listing. */
router.route('/req/').get(getCities).put(getCityByLocation);
router.route('/req/:cityId').get(getCityNameById).put(reduceWeight);
router.route('/search/:location').get(handleSearch)

module.exports = router;

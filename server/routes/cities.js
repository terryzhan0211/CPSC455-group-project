const express = require('express');
const router = express.Router();
const { getCityByLocation, reduceWeight, getCities } = require('../controllers/cityController');

/* GET posts listing. */
router.route('/req/').get(getCities).put(getCityByLocation);
router.route('/req/:cityId').put(reduceWeight);

module.exports = router;

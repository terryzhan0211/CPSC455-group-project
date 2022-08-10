const express = require('express');
const router = express.Router();
const {
	getCityByLocation,
	reduceWeight,
	getCities,
	getCityNameById,
	handleSearch,
} = require('../controllers/cityController');

/* GET posts listing. */
router.route('/req/').get(getCities).put(getCityByLocation);
router.route('/req/:cityId').get(getCityNameById).put(reduceWeight);

// cannot use get for geolocation, can use post only
// reference: https://stackoverflow.com/questions/48749252/swagger-typeerror-failed-to-execute-fetch-on-window-request-with-get-head
router.route('/search/').post(handleSearch);

module.exports = router;

// const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
const City = require('../models/cityModel');
const asyncHandler = require('express-async-handler');

// @des get all cities and sort by weight
// @route GET /cities/req
// @access Private
const getCities = asyncHandler(async (req, res) => {
	const cities = await City.find().sort({ weight: 'desc' });
	// console.log(cities);
	// cities.sort((a, b) => (a.weight > b.weight ? 1 : -1));
	// const sortedCities = _.sortBy( cities, 'weight' );
	return res.status(200).send(cities);
});

// @des Add city
// @route POST /cities/req
// @access Private
const getCityByLocation = asyncHandler(async (req, res) => {
	try {
		let newPostLoc = '';
		let newPostGeo = [];

		if (!req.body.location) {
			return res.status(400).send({ message: 'Post must have location!' });
		}

		newPostLoc = req.body.location;
		newPostGeo = req.body.geo;

		// console.log("newPost");
		// console.log(newPost);
		const newCityname = newPostLoc.split(',')[0];
		const foundCity = await City.find({ cityName: newCityname });
		if (foundCity.length == 0) {
			const newCity = {
				cityName: newCityname,
				actual_location: newPostLoc,
				location: newPostGeo,
				weight: 1,
			};
			const resCity = await City.create(newCity);
			return res.status(200).send(resCity);
		} else {
			foundCity[0].weight++;
			await foundCity[0].save();
			return res.status(200).send(foundCity[0]);
		}
		// console.log(newPost);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		console.log(message);
		// return thunkAPI.rejectWithValue(message)
	}
});

// @des reduce weight
// @route PUT /cities/req
// @access Private
const reduceWeight = asyncHandler(async (req, res) => {
	const foundCity = await City.find({ _id: req.params.cityId });
	if (foundCity.length == 0) res.status(404).send({ message: 'city not found' });

	foundCity[0].weight -= 1;
	await foundCity[0].save();

	res.status(201).json({ cityId: req.body.cityId });
});

// @des Get cityName by cityId
// @route GET /cities/:cityid
// @access Private
const getCityNameById = asyncHandler(async (req, res) => {
	const foundCity = await City.find({ _id: req.params.cityId });
	if (foundCity.length == 0) res.status(404).send({ message: 'city not found' });

	res.status(201).json({ cityName: foundCity[0].cityName });
});

module.exports = {
	getCities,
	getCityByLocation,
	reduceWeight,
	getCityNameById,
};

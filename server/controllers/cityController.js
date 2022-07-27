// const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
const City = require('../models/cityModel');
const asyncHandler = require('express-async-handler');

// @des get all cities and sort by weight
// @route GET /cities
// @access Private
const getCities = asyncHandler(async (req, res) => {
	const cities = await City.find();
	// console.log(cities);
	cities.sort((a, b) => (a.weight > b.weight) ? 1 : -1);
	// const sortedCities = _.sortBy( cities, 'weight' );
	return res.status(200).send(cities);
});


// @des Add city
// @route POST /city
// @access Private
const addCity = asyncHandler(async (req, res) => {
	try {
		let newPostLoc = "";
		let newPostGeo = [];

		if (!req.body.location) {
			return res.status(400).send({ message: 'Post must have location!' });
		}
		
		newPostLoc = req.body.location;
		newPostGeo = req.body.geo

		// console.log("newPost");
		// console.log(newPost);
		const newCityname = newPostLoc.slice(0, newPostLoc.search(','));
		const foundCity = await City.find({ cityName: newCityname });
		if (foundCity.length == 0) {
			const newCity = {
				cityId: uuidv4(),
				cityName: newCityname,
				actual_location: newPostLoc,
				location: newPostGeo,
				weight: 1,
			};
			await City.create(newCity);
			return res.status(200).send(newCity);
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
// @route DELETE /cities/:cityId/:postID
// @access Private
const reduceWeight = asyncHandler(async (req, res) => {
	const foundCity = await City.find({ cityId: req.body.cityId });
	if (foundCity.length == 0) res.status(404).send({ message: 'city not found' });

	foundCity[0].weight -= 1;
	await foundCity[0].save();

	res.status(201).json({cityId: req.body.cityId});
	// const prevWeight = foundCity[0].weight;
	// console.log(prevLen);
	// const newWeight = foundCity[0].posts.length;
	// if (prevLen == newLen) {
	// 	res.status(404).send({ message: 'post not found' });
	// } else {
	// 	foundCity[0].weight = foundCity[0].posts.length;
	// }
	// console.log(newLen);
});

module.exports = {
	getCities,
	addCity,
	reduceWeight,
};

import axios from 'axios';
const { URL } = require('./utils');
const getCityByLocation = async (postData) => {
	await axios
		.get('https://maps.googleapis.com/maps/api/geocode/json', {
			params: {
				address: postData.location,
				key: 'AIzaSyD2YB2p_MX4E0WDiQt5KfODgs1mCfLbWoY',
			},
		})
		.then(function (response) {
			const geo = response.data.results[0].geometry.location;
			postData.geo = new window.google.maps.LatLng(geo.lat, geo.lng);
		})
		.catch(function (error) {
			console.log(error);
		});
	const response = await fetch(URL + 'cities/req/', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(postData),
	});
	const data = await response.json();
	if (!response.ok) {
		const errorMsg = data?.message;
		throw new Error(errorMsg);
	}

	return data;
};

const getCities = async () => {
	const response = await fetch(URL + 'cities/req/', {
		method: 'GET',
	});
	const data = await response.json();
	return data;
};

const reduceWeight = async (cityId) => {
	const response = await fetch(URL + 'cities/req/' + cityId, {
		method: 'PUT',
	});
	const data = await response.json();
	if (!response.ok) {
		const errorMsg = data?.message;
		throw new Error(errorMsg);
	}
	return data;
};

const getCityNameById = async (cityId) => {
	const response = await fetch(URL + 'cities/req/' + cityId, {
		method: 'GET',
	});
	const data = await response.json();
	if (!response.ok) {
		const errorMsg = data?.message;
		throw new Error(errorMsg);
	}
	return data;
};

const handleSearch = async (location) => {
	await axios
		.get('https://maps.googleapis.com/maps/api/geocode/json', {
			params: {
				address: location,
				key: 'AIzaSyD2YB2p_MX4E0WDiQt5KfODgs1mCfLbWoY',
			},
		})
		.then(function (response) {
			const geo = response.data.results[0].geometry.location;
			location = new window.google.maps.LatLng(geo.lat, geo.lng);
		})
		.catch(function (error) {
			console.log(error);
		});
	const response = await fetch(URL + 'cities/search/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(location),
	});
	const data = await response.json();
	console.log(data);
	if (!response.ok) {
		const errorMsg = data?.message;
		console.log(errorMsg);
		throw new Error(errorMsg);
	}
	return data;
};

const citiesService = {
	getCityByLocation,
	getCities,
	reduceWeight,
	getCityNameById,
	handleSearch,
};

export default citiesService;

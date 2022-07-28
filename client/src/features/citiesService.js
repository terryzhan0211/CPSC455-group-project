import axios from 'axios';
const URL = 'http://localhost:3001/';
// implement all requests for postList
const getCityByLocation = async (postData) => {
	console.log(postData);
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
	const response = await fetch('http://localhost:3001/cities/req/', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(postData),
	});
	console.log(response);
	const data = await response.json();
	console.log(data);
	if (!response.ok) {
		const errorMsg = data?.message;
		throw new Error(errorMsg);
	}

	return data;
};

const citiesService = {
	getCityByLocation,
};

export default citiesService;

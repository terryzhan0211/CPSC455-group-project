import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCitiesAsync = createAsyncThunk('cities/thunks/getCities', async () => {
	const response = await fetch('http://localhost:3001/cities/req/', {
		method: 'GET',
	});
	const data = await response.json();
	// console.log(data);
	return data;
});

export const getCityByLocationAsync = createAsyncThunk(
	'cities/thunks/getCityByLocationAsync',
	async (postData, thunkAPI) => {
		try {
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
			console.log(postData);
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
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const reduceWeightAsync = createAsyncThunk(
	'cities/thunks/reduceWeight',
	async (cityId, thunkAPI) => {
		try {
			const response = await fetch('http://localhost:3001/cities/req/' + cityId, {
				method: 'PUT',
			});
			const data = await response.json();
			console.log(data);
			if (!response.ok) {
				const errorMsg = data?.message;
				throw new Error(errorMsg);
			}
			return data;
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);


export const getCityNameById = createAsyncThunk(
	'cities/thunks/getCityNameById',
	async (cityId, thunkAPI) => {
		try {
			const response = await fetch('http://localhost:3001/cities/req/' + cityId, {
				method: 'GET',
			});
			const data = await response.json();
			console.log(data);
			if (!response.ok) {
				const errorMsg = data?.message;
				throw new Error(errorMsg);
			}
			return data;
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

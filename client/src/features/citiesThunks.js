import { createAsyncThunk } from '@reduxjs/toolkit';

import citiesService from './citiesService';

export const getCitiesAsync = createAsyncThunk('cities/thunks/getCities', async () => {
	const response = await fetch('http://localhost:3001/cities/req/', {
		method: 'GET',
	});
	const data = await response.json();
	return data;
});

export const getCityByLocationAsync = createAsyncThunk(
	'cities/thunks/getCityByLocationAsync',
	async (postData, thunkAPI) => {
		try {
			return await citiesService.getCityByLocation(postData);
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

export const handleSearch = createAsyncThunk(
	'cities/thunks/handleSearch',
	async (location, thunkAPI) => {
		try {
			console.log(location);
			const response = await fetch('http://localhost:3001/cities/search/' + location, {
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

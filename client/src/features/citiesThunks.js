import { createAsyncThunk } from '@reduxjs/toolkit';

import citiesService from './citiesService';

export const getCitiesAsync = createAsyncThunk('cities/thunks/getCities', async () => {
	return await citiesService.getCities();
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
			return await citiesService.reduceWeight(cityId);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getCityNameByIdAsync = createAsyncThunk(
	'cities/thunks/getCityNameById',
	async (cityId, thunkAPI) => {
		try {
			return await citiesService.getCityNameById(cityId);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const handleSearchAsync = createAsyncThunk(
	'cities/thunks/handleSearch',
	async (location, thunkAPI) => {
		try {
			return await citiesService.handleSearch(location);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

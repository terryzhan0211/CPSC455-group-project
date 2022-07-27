import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { getCitiesAsync, getCityByLocationAsync,reduceWeightAsync } from './citiesThunks';

const INITIAL_STATE = {
	cities: [
		{
			'cityId': 'b43a46bb-3652-41df-a044-0b45e7b93b92',
			'cityName': 'Vancouver',
			'actual_location': 'Vancouver, BC, Canada',
			'location': {
				'lat': 49.2827291,
				'lng': -123.1207375,
			},
			'weight': 1,
		}],
	currAddpost: {
		'postId':"",
		'cityName':""
	},
	getCities:"",
	getCitiesByLocation:"",
	reduceWeight:"",
	error:"",
};

export const citySlice = createSlice({
	name: 'cities',
	initialState: INITIAL_STATE,

	reducers: {
		getCurrAddPost: (state, action) => {
			return state.currAddpost
		},
	},
	extraReducers: (builder) => {
		builder
			// get initial cities from server
			.addCase(getCitiesAsync.pending, (state) => {
				state.getCities = 'PENDING';
				state.error = null;
			})
			.addCase(getCitiesAsync.fulfilled, (state, action) => {
				state.getCities = 'FULFILLED';
				state.cities = action.payload;
			})
			.addCase(getCitiesAsync.rejected, (state, action) => {
				state.getCities = 'REJECTED';
				state.error = action.error;
			})
			// add post into cities
			.addCase(getCityByLocationAsync.pending, (state) => {
				state.getCitiesByLocation = 'PENDING';
				state.error = null;
			})
			.addCase(getCityByLocationAsync.fulfilled, (state, action) => {
				const newCityname = action.payload.cityName
				const city = state.cities.filter((city) => city.cityId === action.payload.cityId);
				// console.log(`city:${city}`)
				console.log(action.payload);
				if (city.length === 0) {
					let newCity = {
						cityId: action.payload.cityId,
						cityName: newCityname,
						actual_location: action.payload.location,
						location: action.payload.geo,
						weight: 1,
					};
					console.log(newCity);
					state.cities.push(newCity);
				} else {
					// console.log(`city:${city}`)
					city[0].weight += 1;
				}
				state.getCitiesByLocation = 'FULFILLED';
			})
			.addCase(getCityByLocationAsync.rejected, (state, action) => {
				state.getCitiesByLocation = 'REJECTED';
				state.error = action.error;
			})
			.addCase(reduceWeightAsync.pending, (state) => {
				state.reduceWeight = 'PENDING';
				state.error = null;
			})
			.addCase(reduceWeightAsync.fulfilled, (state, action) => {
				state.reduceWeight = 'FULFILLED';
				const foundCity = state.cities.find(function (city) {
					return city.cityId === action.payload.cityId;
				});
				const cityIndex = state.cities.indexOf(foundCity);
				state.cities[cityIndex].weight -= 1;
			})
			.addCase(reduceWeightAsync.rejected, (state, action) => {
				state.reduceWeight = 'REJECTED';
				state.error = action.error;
			})
	},
});

export const {  getCurrAddPost } = citySlice.actions;
export default citySlice.reducer;
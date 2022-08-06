import { createSlice } from '@reduxjs/toolkit';
import {
	getCitiesAsync,
	getCityByLocationAsync,
	getCityNameByIdAsync,
	handleSearchAsync,
	reduceWeightAsync,
} from './citiesThunks';

const INITIAL_STATE = {
	cities: [],
	addPostProps: {
		cityId: '',
		cityName: '',
		actual_location: '',
		location: {},
		weight: 1,
	},
	currCityId: '',
	currCityName: '',
	getCities: 'IDLE',
	getCitiesByLocation: 'IDLE',
	getCityNameById: 'IDLE',
	cityhandleSearch: 'IDLE',
	reduceWeight: 'IDLE',
	error: '',
};

export const citySlice = createSlice({
	name: 'cities',
	initialState: INITIAL_STATE,

	reducers: {
		getCurrAddPost: (state, action) => {
			return state.currAddpost;
		},
		searchStateToIdle: (state, action) => {
			state.cityhandleSearch = 'IDLE';
		},
		setGetCityNameByIdToIdle: (state, action) => {
			state.getCityNameById = 'IDLE';
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
			.addCase(getCityByLocationAsync.pending, (state) => {
				state.getCitiesByLocation = 'PENDING';
				state.error = null;
			})
			.addCase(getCityByLocationAsync.fulfilled, (state, action) => {
				state.getCitiesByLocation = 'FULFILLED';
				state.addPostProps = action.payload;
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
					return city._id === action.payload.cityId;
				});
				if (foundCity) {
					const cityIndex = state.cities.indexOf(foundCity);
					state.cities[cityIndex].weight -= 1;
				}
			})
			.addCase(reduceWeightAsync.rejected, (state, action) => {
				state.reduceWeight = 'REJECTED';
				state.error = action.error;
			})
			.addCase(getCityNameByIdAsync.pending, (state) => {
				state.getCityNameById = 'PENDING';
				state.error = null;
			})
			.addCase(getCityNameByIdAsync.fulfilled, (state, action) => {
				state.getCityNameById = 'FULFILLED';
				state.currCityName = action.payload.cityName.toUpperCase();
			})
			.addCase(getCityNameByIdAsync.rejected, (state, action) => {
				state.getCityNameById = 'REJECTED';
				state.error = action.error;
			})
			.addCase(handleSearchAsync.pending, (state) => {
				state.cityhandleSearch = 'PENDING';
				state.error = null;
			})
			.addCase(handleSearchAsync.fulfilled, (state, action) => {
				state.currCityId = action.payload._id;
				state.cityhandleSearch = 'FULFILLED';
			})
			.addCase(handleSearchAsync.rejected, (state, action) => {
				state.cityhandleSearch = 'REJECTED';
				state.error = action.error;
			});
	},
});

export const { getCurrAddPost, searchStateToIdle, setGetCityNameByIdToIdle } = citySlice.actions;
export default citySlice.reducer;

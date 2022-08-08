import { createSlice } from '@reduxjs/toolkit';
import {
	getCitiesAsync,
	getCityByLocationAsync,
	getCityNameByIdAsync,
	handleSearchAsync,
	reduceWeightAsync,
} from './citiesThunks';
import { REQUEST_STATE } from './utils';
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
	getCities: REQUEST_STATE.IDLE,
	getCitiesByLocation: REQUEST_STATE.IDLE,
	getCityNameById: REQUEST_STATE.IDLE,
	cityhandleSearch: REQUEST_STATE.IDLE,
	reduceWeight: REQUEST_STATE.IDLE,
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
			state.cityhandleSearch = REQUEST_STATE.IDLE;
		},
		setGetCityNameByIdToIdle: (state, action) => {
			state.getCityNameById = REQUEST_STATE.IDLE;
		},
	},
	extraReducers: (builder) => {
		builder
			// get initial cities from server
			.addCase(getCitiesAsync.pending, (state) => {
				state.getCities = REQUEST_STATE.PENDING;
				state.error = null;
			})
			.addCase(getCitiesAsync.fulfilled, (state, action) => {
				state.getCities = REQUEST_STATE.FULFILLED;
				state.cities = action.payload;
			})
			.addCase(getCitiesAsync.rejected, (state, action) => {
				state.getCities = REQUEST_STATE.REJECTED;
				state.error = action.error;
			})
			.addCase(getCityByLocationAsync.pending, (state) => {
				state.getCitiesByLocation = REQUEST_STATE.PENDING;
				state.error = null;
			})
			.addCase(getCityByLocationAsync.fulfilled, (state, action) => {
				state.getCitiesByLocation = REQUEST_STATE.FULFILLED;
				state.addPostProps = action.payload;
			})
			.addCase(getCityByLocationAsync.rejected, (state, action) => {
				state.getCitiesByLocation = REQUEST_STATE.REJECTED;
				state.error = action.error;
			})
			.addCase(reduceWeightAsync.pending, (state) => {
				state.reduceWeight = REQUEST_STATE.PENDING;
				state.error = null;
			})
			.addCase(reduceWeightAsync.fulfilled, (state, action) => {
				state.reduceWeight = REQUEST_STATE.FULFILLED;
				const foundCity = state.cities.find(function (city) {
					return city._id === action.payload.cityId;
				});
				if (foundCity) {
					const cityIndex = state.cities.indexOf(foundCity);
					state.cities[cityIndex].weight -= 1;
				}
			})
			.addCase(reduceWeightAsync.rejected, (state, action) => {
				state.reduceWeight = REQUEST_STATE.REJECTED;
				state.error = action.error;
			})
			.addCase(getCityNameByIdAsync.pending, (state) => {
				state.getCityNameById = REQUEST_STATE.PENDING;
				state.error = null;
			})
			.addCase(getCityNameByIdAsync.fulfilled, (state, action) => {
				state.getCityNameById = REQUEST_STATE.FULFILLED;
				state.currCityName = action.payload.cityName.toUpperCase();
			})
			.addCase(getCityNameByIdAsync.rejected, (state, action) => {
				state.getCityNameById = REQUEST_STATE.REJECTED;
				state.error = action.error;
			})
			.addCase(handleSearchAsync.pending, (state) => {
				state.cityhandleSearch = REQUEST_STATE.PENDING;
				state.error = null;
			})
			.addCase(handleSearchAsync.fulfilled, (state, action) => {
				state.currCityId = action.payload._id;
				state.cityhandleSearch = REQUEST_STATE.FULFILLED;
			})
			.addCase(handleSearchAsync.rejected, (state, action) => {
				state.cityhandleSearch = REQUEST_STATE.REJECTED;
				state.error = action.error;
			});
	},
});

export const { getCurrAddPost, searchStateToIdle, setGetCityNameByIdToIdle } = citySlice.actions;
export default citySlice.reducer;

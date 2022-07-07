import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
const noUserState = { id: '-1', userName: 'test', password: '' };
const INITIAL_STATE = {
	currUser: noUserState,
	users: [
		{ id: '0', userName: 'test user 1', password: 'test123' },
		{ id: '1', userName: 'test user 2', password: 'test123' },
	],
	isLogin: false,
};
export const userSlice = createSlice({
	name: 'user',
	initialState: INITIAL_STATE,

	reducers: {
		loginUser: (state, action) => {
			state.isLogin = true;
		},
		signupUser: (state, action) => {},
		signoutUser: (state, action) => {},
	},
	// extraReducers: (builder) => {
	// 	builder
	// 		// get initial cities from server
	// 		// 	.addCase(getCitiesAsync.pending, (state) => {
	// 		// 		state.getCities = 'PENDING';
	// 		// 		state.error = null;
	// 		// 	})
	// 		// 	.addCase(getCitiesAsync.fulfilled, (state, action) => {
	// 		// 		state.getCities = 'FULFILLED';
	// 		// 		state.cities = action.payload;
	// 		// 	})
	// 		// 	.addCase(getCitiesAsync.rejected, (state, action) => {
	// 		// 		state.getCities = 'REJECTED';
	// 		// 		state.error = action.error;
	// 		// 	})
	// 		// add post into cities
	// 		.addCase(addPost.pending, (state) => {
	// 			state.addPost = 'PENDING';
	// 			state.error = null;
	// 		})
	// 		.addCase(addPost.fulfilled, (state, action) => {
	// 			const newCityname = action.payload.location.slice(
	// 				0,
	// 				action.payload.location.search(',')
	// 			);
	// 			const city = state.cities.filter((city) => city.cityName === newCityname);
	// 			// console.log(`city:${city}`)
	// 			console.log(action.payload);
	// 			if (city.length === 0) {
	// 				let newCity = {
	// 					cityId: uuidv4(),
	// 					cityName: newCityname,
	// 					actual_location: action.payload.location,
	// 					location: action.payload.geo,
	// 					weight: 1,
	// 					posts: [action.payload],
	// 				};
	// 				console.log(newCity);
	// 				state.cities.push(newCity);
	// 			} else {
	// 				// console.log(`city:${city}`)
	// 				city[0].posts.push(action.payload);
	// 				city[0].weight += 1;
	// 			}
	// 		})
	// 		.addCase(addPost.rejected, (state, action) => {
	// 			state.addPost = 'REJECTED';
	// 			state.error = action.error;
	// 		});
	// 	// delete post
	// },
});
export const { loginUser, signupUser } = userSlice.actions;
export default userSlice.reducer;

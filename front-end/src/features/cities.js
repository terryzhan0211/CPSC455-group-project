import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { getCitiesAsync, addPostAsync, } from './thunks';
// import { dblClick } from '@testing-library/user-event/dist/click';

// const INITIAL_STATE = {
// 	cities: [],
// 	currPosts: {
// 		city: 'CURRENT CITY',
// 		posts: [],
// 	},
// 	currPost: {},
// 	getCities: 'IDLE',
// 	addPost: 'IDLE',
// 	deletePost: 'IDLE',
//
// 	error: null
// };

const INITIAL_STATE = {
	cities: [],
	currPosts: {},
	currPost: {},
	getCities: 'IDLE',
	addPost: 'IDLE',
};

export const citySlice = createSlice({
	name: 'cities',
	initialState: INITIAL_STATE,

	reducers: {
		deletePost: (state, action) => {
			const foundCity = state.cities.find(function (city) {
				return city.cityId === action.payload.cityId;
			});
			const cityIndex = state.cities.indexOf(foundCity);
			// const foundPost = foundCity.posts.find((post) => post.postId === action.payload.postId);
			state.cities[cityIndex].posts = foundCity.posts.filter(
				(post) => post.postID !== action.payload.postID
			);
		},
		getCurrPosts: (state, action) => {
			const foundCurrPosts = state.cities.find((city) => city.cityName === action.payload);
			const currPosts = {
				city: action.payload,
				posts: foundCurrPosts.posts,
			};
			console.log(currPosts);
			state.currPosts = currPosts;
		},
		getCurrPost: (state, action) => {
			const postlist = state.currPosts.posts;
			console.log(action.payload);
			const foundCurrPost = state.currPosts.posts.find(
				(post) => post.postID === action.payload
			);
			const currPost = foundCurrPost;
			currPost.city = state.currPosts.city;
			console.log(currPost);
			state.currPost = currPost;
		},
		updatePost: (state, action) => {
			const foundCity = state.cities.find(function (city) {
				return city.cityId === action.payload.cityId;
			});
			const cityIndex = state.cities.indexOf(foundCity);
			const foundPost = foundCity.posts.find((post) => post.postID === action.payload.postID);
			const postIndex = state.cities[cityIndex].posts.indexOf(foundPost);
			foundPost.title = action.payload.title;
			foundPost.content = action.payload.content;
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
			.addCase(addPostAsync.pending, (state) => {
				state.addPost = 'PENDING';
				state.error = null;
			})
			.addCase(addPostAsync.fulfilled, (state, action) => {
				const newCityname = action.payload.location.slice(
					0,
					action.payload.location.search(',')
				);
				const city = state.cities.filter((city) => city.city === action.payload.cityId);
				// console.log(`city:${city}`)
				console.log(action.payload);
				if (city.length === 0) {
					let newCity = {
						cityId: action.payload.cityId,
						cityName: newCityname,
						actual_location: action.payload.location,
						location: action.payload.geo,
						weight: 1,
						posts: [action.payload],
					};
					console.log(newCity);
					state.cities.push(newCity);
				} else {
					// console.log(`city:${city}`)
					city[0].posts.push(action.payload);
					city[0].weight += 1;
				}
			})
			.addCase(addPostAsync.rejected, (state, action) => {
				state.addPost = 'REJECTED';
				state.error = action.error;
			});
		// delete post
		// backend database
	},
});

// add post
// posts []
// post.city
// cities [post.city] + post
// {
//	city: name,
//	posts: []
// }
export const { deletePost, getCurrPosts, getCurrPost } = citySlice.actions;
export default citySlice.reducer;

import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid';
// import { addPost, getCitiesAsync, } from './thunks';
import axios from "axios";

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
	cities: [
		{
			cityId: "0",
			cityName: 'city demo',
			actual_location: "",
			location: {
				lat: 49.2827,
				lng: -123.1207,
			},
			weight: 1,
			posts: [
				{
					postID: "1",
					title: 'title demo',
					content: 'content demo',
					location: 'location, demo',
					geo: '',
					photos: [],
					date: new Date()
				},
			],
		},
	],
	currPosts: {
		city: 'CURRENT CITY',
		posts: [{
			userName: "demo",
			postId: "1",
			title: 'title demo',
			content: 'content demo',
			location: 'location, demo',
			geo: '',
			photos: [],
			date: new Date()
			},
		],
	},
	currPost: {},
};

export const addPost = createAsyncThunk(
	'posts/add',
	async (postData, thunkAPI) => {
		try {
			let newPost = {
				postID: uuidv4(),
				title: '',
				content: '',
				location: '',
				geo: '',
				photos: [],
				date: new Date(),
			};
			newPost.title = postData.title;
			newPost.content = postData.content;
			newPost.location =postData.location;
			postData.photos.forEach((i) => {newPost.photos.push(i)});
			console.log("newPost");
			console.log(newPost);
			// cities[action.payload.city].posts.push(newPost);

			await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
				params: {
					address: newPost.location,
					key: "AIzaSyD2YB2p_MX4E0WDiQt5KfODgs1mCfLbWoY"
				}
			})
				.then(function (response) {
					const geo = response.data.results[0].geometry.location;
					newPost.geo = new window.google.maps.LatLng(geo.lat, geo.lng)
					// console.log(newPost);
				})
				.catch(function (error) {
					console.log(error)
				})
			return newPost;
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()
			return thunkAPI.rejectWithValue(message)
		}
	}
)

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
			state.cities[cityIndex].posts = foundCity.posts.filter((post) => post.postId !== action.payload.postId);
		},
		getPosts: (state, action) => {},
		updatePost: (state, action) => {
			const foundCity = state.cities.find(function (city) {
				return city.cityId === action.payload.cityId;
			});
			const cityIndex = state.cities.indexOf(foundCity);
			const foundPost = foundCity.posts.find((post) => post.postId === action.payload.postId);
			const postIndex = state.cities[cityIndex].posts.indexOf(foundPost);
			foundPost.title = action.payload.title;
			foundPost.content = action.payload.content;
		},
	},
	extraReducers: (builder) => {
		builder
			// get initial cities from server
		// 	.addCase(getCitiesAsync.pending, (state) => {
		// 		state.getCities = 'PENDING';
		// 		state.error = null;
		// 	})
		// 	.addCase(getCitiesAsync.fulfilled, (state, action) => {
		// 		state.getCities = 'FULFILLED';
		// 		state.cities = action.payload;
		// 	})
		// 	.addCase(getCitiesAsync.rejected, (state, action) => {
		// 		state.getCities = 'REJECTED';
		// 		state.error = action.error;
		// 	})
			// add post into cities
			.addCase(addPost.pending, (state) => {
				state.addPost = 'PENDING';
				state.error = null;
			})
			.addCase(addPost.fulfilled, (state,action) => {
				const newCityname = action.payload.location.slice(0,action.payload.location.search(","))
				const city = state.cities.filter(city => city.cityName === newCityname)
				// console.log(`city:${city}`)
				console.log(action.payload);
				if (city.length === 0){
					let newCity = {
						cityId:uuidv4(),
						cityName: newCityname,
						actual_location:action.payload.location,
						location: action.payload.geo,
						weight: 1,
						posts: [action.payload],
					}
					state.cities.push(newCity)
				} else{
					// console.log(`city:${city}`)
					city[0].posts.push(action.payload)
					city[0].weight += 1
				}
			})
			.addCase(addPost.rejected, (state, action) => {
				state.addPost = 'REJECTED';
				state.error = action.error;
			})
			// delete post
	}
});

// add post
// posts []
// post.city
// cities [post.city] + post
// {
//	city: name,
//	posts: []
// }
export const { deletePost, getPosts } = citySlice.actions;
export default citySlice.reducer;
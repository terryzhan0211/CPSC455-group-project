import {createSlice} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';
import axios from "axios";


const INITIAL_STATE = {
	cities: [
		{
			city: 'city demo',
			actul_location:"",
			geo: 0,
			postsLength: 0,
			posts: [],
		},
	],
	currPosts: {
		city: 'CURRENT CITY',
		posts: [],
	},
	currPost: {},
};

const geocode = async (location) => {
	await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
		params: {
			address: location,
			key: "AIzaSyAAwk6r2Mk44TaSD6bDesY4IUel2zVX9Pw"
		}
	})
		.then(function (response) {
			const geolocation = response.data.results[0].geometry.location
			// console.log(`lat = ${geolocation.lat},lng = ${geolocation.lng}`)

		})
		.catch(function (error) {
			console.log(error)
		})
};

export const citySlice = createSlice({
	name: 'cities',
	initialState: INITIAL_STATE,


	reducers: {
		// addPost: (state, action) => {
		// 	let newPost = {
		// 		postID: uuidv4(),
		// 		title: '',
		// 		content: '',
		// 		location: '',
		// 		geo: '',
		// 		photos: [],
		// 		date: new Date(),
		// 	};
		// 	newPost.title = action.payload.title;
		// 	newPost.content = action.payload.content;
		// 	newPost.location = action.payload.location;
		// 	newPost.photos = action.payload.photos;
		// 	newPost.geo = geocode(action.payload.location);
		// 	console.log(newPost);
		// 	state.cities.push(newPost);
		// 	// state.cities[2].posts.push(newPost);
		// },
		addPost : async (state, action) => {
			let newPost = {
				postID: uuidv4(),
				title: '',
				content: '',
				location: '',
				geo: '',
				photos: [],
				date: new Date(),
			};
			newPost.title = action.payload.title;
			newPost.content = action.payload.content;
			newPost.location = action.payload.location;
			newPost.photos = action.payload.photos;


			await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
				params: {
					address: newPost.location,
					key: "AIzaSyAAwk6r2Mk44TaSD6bDesY4IUel2zVX9Pw"
				}
			})
				.then(function (response) {
					newPost.geo = response.data.results[0].geometry.location;
					console.log(newPost);
				})
				.catch(function (error) {
					console.log(error)
				})
			state.cities.push(newPost);
		},
		deletePost: (state, action) => {
			var newPosts = state.posts.filter(function (post) {
				return post.UUID !== action.payload;
			});
			state.posts = newPosts;
		},
		getPosts: (state, action) => {},
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
export const { addPost, deletePost, getPosts } = citySlice.actions;
export default citySlice.reducer;

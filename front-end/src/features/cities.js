import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';
import axios from "axios";


const INITIAL_STATE = {
	cities: [
		// {
		// 	cityName: 'city demo',
		// 	actual_location:"",
		// 	location: 0,
		// 	weight: 0,
		// 	posts: [],
		// },
	],
	currPosts: {
		city: 'CURRENT CITY',
		posts: [],
	},
	currPost: {},
};

// Add post
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
			newPost.location = postData.location;
			newPost.photos = postData.photos;

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
			var newPosts = state.posts.filter(function (post) {
				return post.UUID !== action.payload;
			});
			state.posts = newPosts;
		},
		getPosts: (state, action) => {},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addPost.fulfilled, (state,action) => {
				const newCityname = action.payload.location.slice(0,action.payload.location.search(","))
				const city = state.cities.filter(city => city.cityName === newCityname)
				// console.log(`city:${city}`)
				if (city.length === 0){
					let newCity = {
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

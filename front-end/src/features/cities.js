import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
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
					key: "AIzaSyAAwk6r2Mk44TaSD6bDesY4IUel2zVX9Pw"
				}
			})
				.then(function (response) {
					newPost.geo = response.data.results[0].geometry.location;
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
				state.cities.push(action.payload)
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

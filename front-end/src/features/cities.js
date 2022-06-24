import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

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

export const citySlice = createSlice({
	name: 'cities',
	initialState: INITIAL_STATE,

	reducers: {
		addPost: (state, action) => {
			let newPost = {
				postID: uuidv4(),
				title: '',
				content: '',
				location:'',
				photos: [],
				date: new Date(),
			};

			newPost.title = action.payload.title;
			newPost.content = action.payload.content;
			newPost.location = action.payload.location;
			action.payload.photos.map((i) =>{newPost.photos.push(i)});
			console.log(newPost);
			// cities[action.payload.city].posts.push(newPost);
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

import { createSlice } from '@reduxjs/toolkit';
const INITIAL_STATE = {
	posts: [
		{
			city: 'city demo',
			posts: [],
		},
	],
};

export const dataSlice = createSlice({
	name: 'data',
	initialState: INITIAL_STATE,

	reducers: {
		addPost: (state, action) => {
			state.posts.push(action.payload);
			const loadCity = state.cities.find(function (city) {
				return action.payload.city === city;
			});
			if (loadCity) {
				state.cities[loadCity].push(action.payload);
			} else {
				state.cities.push(loadCity);
				state.cities[loadCity].push(action.payload);
			}
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

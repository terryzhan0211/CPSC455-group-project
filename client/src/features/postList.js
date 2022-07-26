import { createSlice } from '@reduxjs/toolkit';
import { getPostListByCityIdAsync, getPostListByUserIdAsync, addPostAsync, deletePostAsync } from './postListThunks';
const initialState = {
	postList: [
		{
			postId: '',
			cityId: '',
			userId: '',
			username: '',
			title: '',
			content: '',
			photos: [],
			likes: 0,
			create_date: '',
		},
	],
	getPosts: 'IDLE',

};

export const postListSlice = createSlice({
	name: 'postList',
	initialState: initialState,
	reducers: {
		deletePost: (state, action) => {
			const foundCity = state.cities.find(function (city) {
				return city.cityId === action.payload.cityId;
			});
			const cityIndex = state.cities.indexOf(foundCity);
			state.cities[cityIndex].posts = foundCity.posts.filter(
				(post) => post.postID !== action.payload.postID
			);
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
			// get initial posts from server
			.addCase(getPostListByCityIdAsync.pending, (state) => {
				state.getPosts = 'PENDING';
				state.error = null;
			})
			.addCase(getPostListByCityIdAsync.fulfilled, (state, action) => {
				state.getPosts = 'FULFILLED';
				state.postList = action.payload;
			})
			.addCase(getPostListByCityIdAsync.rejected, (state, action) => {
				state.getPosts = 'REJECTED';
				state.error = action.error;
			})
			// add post 
			.addCase(addPostAsync.pending, (state) => {
				state.addPost = 'PENDING';
				state.error = null;
			})
			.addCase(addPostAsync.fulfilled, (state, action) => {
				const newCityname = action.payload.location.slice(
					0,
					action.payload.location.search(',')
				);
				const city = state.cities.filter((city) => city.cityId === action.payload.cityId);
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
			})
			// delete post
			.addCase(deletePostAsync.pending, (state) => {
				state.deletePost = 'PENDING';
				state.error = null;
			})
			.addCase(deletePostAsync.fulfilled, (state, action) => {
				state.deletePost = 'FULFILLED';
				// state.cities = action.payload;
			})
			.addCase(deletePostAsync.rejected, (state, action) => {
				state.deletePost = 'REJECTED';
				state.error = action.error;
			});
	},
});

export const {} = postListSlice.actions;
export default postListSlice.reducer;

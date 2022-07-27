import { createSlice } from '@reduxjs/toolkit';
import {
	addPostAsync,
	getPostListByCityIdAsync,
	getPostListByUserIdAsync,
	getPostByIdAsync,
	deletePostByIdAsync,
	increaseLikePostByIdAsync,
	decreaseLikePostByIdAsync,
	sortPostByLikeAsync,
	sortPostByDateAsync,
} from './postListThunks';
const initialState = {
	// postlist in one specific city
	postList: [],
	userPostList: [],
	currentPost: {},
	addPost: 'IDEL',
	getPostListByCityId: 'IDEL',
	getPostListByUserId: 'IDLE',
	getPostById: 'IDLE',
	deletePostById: 'IDLE',
	increaseLikePostById: 'IDLE',
	decreaseLikePostById: 'IDLE',
	sortPostByLike: 'IDLE',
	sortPostByDate: 'IDLE',
};

export const postListSlice = createSlice({
	name: 'postList',
	initialState: initialState,
	reducers: {
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
			// add post
			.addCase(addPostAsync.pending, (state) => {
				state.addPost = 'PENDING';
				state.error = null;
			})
			.addCase(addPostAsync.fulfilled, (state, action) => {
				state.addPost = 'FULFILLED';
				state.postList.push(action.payload);
				state.userPostList.push(action.payload);
			})
			.addCase(addPostAsync.rejected, (state, action) => {
				state.addPost = 'REJECTED';
				state.error = action.error;
			})

			// get post list by cityId
			.addCase(getPostListByCityIdAsync.pending, (state) => {
				state.getPostListByCityId = 'PENDING';
				state.error = null;
			})
			.addCase(getPostListByCityIdAsync.fulfilled, (state, action) => {
				state.getPostListByCityId = 'FULFILLED';
				state.postList = action.payload;
				console.log(state.postList);
			})
			.addCase(getPostListByCityIdAsync.rejected, (state, action) => {
				state.getPostListByCityId = 'REJECTED';
				state.error = action.error;
			})

			// get post list by userId
			.addCase(getPostListByUserIdAsync.pending, (state) => {
				state.getPostListByUserId = 'PENDING';
				state.error = null;
			})
			.addCase(getPostListByUserIdAsync.fulfilled, (state, action) => {
				state.getPostListByUserId = 'FULFILLED';
				state.userPostList = action.payload;
				console.log(state.userPostList);
			})
			.addCase(getPostListByUserIdAsync.rejected, (state, action) => {
				state.getPostListByUserId = 'REJECTED';
				state.error = action.error;
			})

			// get single post by post id
			.addCase(getPostByIdAsync.pending, (state) => {
				state.getPostById = 'PENDING';
				state.error = null;
			})
			.addCase(getPostByIdAsync.fulfilled, (state, action) => {
				state.getPostById = 'FULFILLED';
				state.currentPost = action.payload;
			})
			.addCase(getPostByIdAsync.rejected, (state, action) => {
				state.getPostById = 'REJECTED';
				state.error = action.error;
			})

			// delete single post by post id
			.addCase(deletePostByIdAsync.pending, (state) => {
				state.deletePostById = 'PENDING';
				state.error = null;
			})
			.addCase(deletePostByIdAsync.fulfilled, (state, action) => {
				state.deletePostById = 'FULFILLED';
				state.userPostList = state.userPostList.filter((post) => {
					return post._id !== action.payload._id;
				});
				state.postList = state.postList.filter((post) => {
					return post._id !== action.payload._id;
				});
			})
			.addCase(deletePostByIdAsync.rejected, (state, action) => {
				state.deletePostById = 'REJECTED';
				state.error = action.error;
			})

			// increase single post like count by post id
			.addCase(increaseLikePostByIdAsync.pending, (state) => {
				state.increaseLikePostById = 'PENDING';
				state.error = null;
			})
			.addCase(increaseLikePostByIdAsync.fulfilled, (state, action) => {
				state.increaseLikePostById = 'FULFILLED';
				state.currentPost.likes++;
			})
			.addCase(increaseLikePostByIdAsync.rejected, (state, action) => {
				state.increaseLikePostById = 'REJECTED';
				state.error = action.error;
			})

			// decrease single post like count by post id
			.addCase(decreaseLikePostByIdAsync.pending, (state) => {
				state.decreaseLikePostById = 'PENDING';
				state.error = null;
			})
			.addCase(decreaseLikePostByIdAsync.fulfilled, (state, action) => {
				state.decreaseLikePostById = 'FULFILLED';
				state.currentPost.likes--;
			})
			.addCase(decreaseLikePostByIdAsync.rejected, (state, action) => {
				state.decreaseLikePostById = 'REJECTED';
				state.error = action.error;
			})

			// sort post list by like counts
			.addCase(sortPostByLikeAsync.pending, (state) => {
				state.sortPostByLike = 'PENDING';
				state.error = null;
			})
			.addCase(sortPostByLikeAsync.fulfilled, (state, action) => {
				state.sortPostByLike = 'FULFILLED';
				state.postList = action.payload;
			})
			.addCase(sortPostByLikeAsync.rejected, (state, action) => {
				state.sortPostByLike = 'REJECTED';
				state.error = action.error;
			})

			// sort post list by date from new to old
			.addCase(sortPostByDateAsync.pending, (state) => {
				state.sortPostByDate = 'PENDING';
				state.error = null;
			})
			.addCase(sortPostByDateAsync.fulfilled, (state, action) => {
				state.sortPostByDate = 'FULFILLED';
				state.postList = action.payload;
			})
			.addCase(sortPostByDateAsync.rejected, (state, action) => {
				state.sortPostByDate = 'REJECTED';
				state.error = action.error;
			});
	},
});

export const {} = postListSlice.actions;
export default postListSlice.reducer;

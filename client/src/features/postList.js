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
import { REQUEST_STATE } from './utils';

const initialState = {
	postList: [],
	userPostList: [],
	currentPost: {
		_id: '',
		title: '',
		content: '',
		photos: [],
		userId: '',
		username: '',
		cityId: '',
		cityName: '',
		likes: 0,
	},
	newPost: {},
	addPost: REQUEST_STATE.IDLE,
	getPostListByCityId: REQUEST_STATE.IDLE,
	getPostListByUserId: REQUEST_STATE.IDLE,
	getPostById: REQUEST_STATE.IDLE,
	deletePostById: REQUEST_STATE.IDLE,
	increaseLikePostById: REQUEST_STATE.IDLE,
	decreaseLikePostById: REQUEST_STATE.IDLE,
	sortPostByLike: REQUEST_STATE.IDLE,
	sortPostByDate: REQUEST_STATE.IDLE,
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
		setStatusToIdle: (state, action) => {
			state.getPostListByCityId = REQUEST_STATE.IDLE;
			state.getPostById = REQUEST_STATE.IDLE;
			state.getPostListByUserId = REQUEST_STATE.IDLE;
		},
		clearUserPosts: (state, action) => {
			state.userPostList = [];
		},
		setAddPostStatusToIdle: (state, action) => {
			state.addPost = REQUEST_STATE.IDLE;
		},
	},
	extraReducers: (builder) => {
		builder
			// add post
			.addCase(addPostAsync.pending, (state) => {
				state.addPost = REQUEST_STATE.PENDING;
				state.error = null;
			})
			.addCase(addPostAsync.fulfilled, (state, action) => {
				state.addPost = REQUEST_STATE.FULFILLED;
				state.postList.unshift(action.payload);
				state.userPostList.unshift(action.payload);
				state.newPost = action.payload;
			})
			.addCase(addPostAsync.rejected, (state, action) => {
				state.addPost = REQUEST_STATE.REJECTED;
				state.error = action.error;
			})

			// get post list by cityId
			.addCase(getPostListByCityIdAsync.pending, (state) => {
				state.getPostListByCityId = REQUEST_STATE.PENDING;
				state.error = null;
			})
			.addCase(getPostListByCityIdAsync.fulfilled, (state, action) => {
				state.getPostListByCityId = REQUEST_STATE.FULFILLED;
				state.postList = action.payload;
			})
			.addCase(getPostListByCityIdAsync.rejected, (state, action) => {
				state.getPostListByCityId = REQUEST_STATE.REJECTED;
				state.error = action.error;
			})

			// get post list by userId
			.addCase(getPostListByUserIdAsync.pending, (state) => {
				state.getPostListByUserId = REQUEST_STATE.PENDING;
				state.error = null;
			})
			.addCase(getPostListByUserIdAsync.fulfilled, (state, action) => {
				state.userPostList = action.payload;
				state.getPostListByUserId = REQUEST_STATE.FULFILLED;
			})
			.addCase(getPostListByUserIdAsync.rejected, (state, action) => {
				state.getPostListByUserId = REQUEST_STATE.REJECTED;
				state.error = action.error;
			})

			// get single post by post id
			.addCase(getPostByIdAsync.pending, (state) => {
				state.getPostById = REQUEST_STATE.PENDING;
				state.error = null;
			})
			.addCase(getPostByIdAsync.fulfilled, (state, action) => {
				state.currentPost = action.payload;
				state.getPostById = REQUEST_STATE.FULFILLED;
			})
			.addCase(getPostByIdAsync.rejected, (state, action) => {
				state.getPostById = REQUEST_STATE.REJECTED;
				state.error = action.error;
			})

			// delete single post by post id
			.addCase(deletePostByIdAsync.pending, (state) => {
				state.deletePostById = REQUEST_STATE.PENDING;
				state.error = null;
			})
			.addCase(deletePostByIdAsync.fulfilled, (state, action) => {
				state.deletePostById = REQUEST_STATE.FULFILLED;
				state.userPostList = state.userPostList.filter((post) => {
					return post._id !== action.payload._id;
				});
				state.postList = state.postList.filter((post) => {
					return post._id !== action.payload._id;
				});
			})
			.addCase(deletePostByIdAsync.rejected, (state, action) => {
				state.deletePostById = REQUEST_STATE.REJECTED;
				state.error = action.error;
			})

			// increase single post like count by post id
			.addCase(increaseLikePostByIdAsync.pending, (state) => {
				state.increaseLikePostById = REQUEST_STATE.PENDING;
				state.error = null;
			})
			.addCase(increaseLikePostByIdAsync.fulfilled, (state, action) => {
				state.increaseLikePostById = REQUEST_STATE.FULFILLED;
				state.currentPost.likes++;
			})
			.addCase(increaseLikePostByIdAsync.rejected, (state, action) => {
				state.increaseLikePostById = REQUEST_STATE.REJECTED;
				state.error = action.error;
			})

			// decrease single post like count by post id
			.addCase(decreaseLikePostByIdAsync.pending, (state) => {
				state.decreaseLikePostById = REQUEST_STATE.PENDING;
				state.error = null;
			})
			.addCase(decreaseLikePostByIdAsync.fulfilled, (state, action) => {
				state.decreaseLikePostById = REQUEST_STATE.FULFILLED;
				state.currentPost.likes--;
			})
			.addCase(decreaseLikePostByIdAsync.rejected, (state, action) => {
				state.decreaseLikePostById = REQUEST_STATE.REJECTED;
				state.error = action.error;
			})

			// sort post list by like counts
			.addCase(sortPostByLikeAsync.pending, (state) => {
				state.sortPostByLike = REQUEST_STATE.PENDING;
				state.error = null;
			})
			.addCase(sortPostByLikeAsync.fulfilled, (state, action) => {
				state.sortPostByLike = REQUEST_STATE.FULFILLED;
				state.postList = action.payload;
			})
			.addCase(sortPostByLikeAsync.rejected, (state, action) => {
				state.sortPostByLike = REQUEST_STATE.REJECTED;
				state.error = action.error;
			})

			// sort post list by date from new to old
			.addCase(sortPostByDateAsync.pending, (state) => {
				state.sortPostByDate = REQUEST_STATE.PENDING;
				state.error = null;
			})
			.addCase(sortPostByDateAsync.fulfilled, (state, action) => {
				state.sortPostByDate = REQUEST_STATE.FULFILLED;
				state.postList = action.payload;
			})
			.addCase(sortPostByDateAsync.rejected, (state, action) => {
				state.sortPostByDate = REQUEST_STATE.REJECTED;
				state.error = action.error;
			});
	},
});

export const { setStatusToIdle, clearUserPosts, setAddPostStatusToIdle } = postListSlice.actions;
export default postListSlice.reducer;

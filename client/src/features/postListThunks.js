import { createAsyncThunk } from '@reduxjs/toolkit';
import postListService from './postListService';

// TODO
// get post list by city id, sorted by date from new to old
export const getPostListByCityIdAsync = createAsyncThunk(
	'postList/thunks/getPostListByCity',
	async (cityId, thunkAPI) => {
		try {
			return await postListService.getPostListByCityID(cityId);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// TODO
// get post list by user id, sorted by date from new to old
export const getPostListByUserIdAsync = createAsyncThunk(
	'postList/thunks/getPostListByUser',
	async (userId, thunkAPI) => {
		try {
			return await postListService.getPostListByUserId(userId);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// TODO
// get single post by post id
export const getPostByIdAsync = createAsyncThunk(
	'postList/thunks/getPost',
	async (postId, thunkAPI) => {
		try {
			return await postListService.getPostById(postId);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// TODO
// delete single post by post id
export const deletePostByIdAsync = createAsyncThunk(
	'postList/thunks/deletePost',
	async (postId, thunkAPI) => {
		try {
			return await postListService.deletePostById(postId);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Don't do it yet
// edit single post by post id
export const editPostByIdAsync = createAsyncThunk(
	'postList/thunks/editPost',
	async (postId, thunkAPI) => {
		try {
			return await postListService.editPostById(postId);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// TODO
// increase single post like count by post id
export const increaseLikePostByIdAsync = createAsyncThunk(
	'postList/thunks/increaseLikePostById',
	async (postId, thunkAPI) => {
		try {
			return await postListService.increaseLikePostById(postId);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// TODO
// decrease single post like count by post id
export const decreaseLikePostByIdAsync = createAsyncThunk(
	'postList/thunks/decreaseLikePostById',
	async (postId, thunkAPI) => {
		try {
			return await postListService.decreaseLikePostById(postId);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// TODO
// sort post list by like counts
export const sortPostByLikeAsync = createAsyncThunk(
	'postList/thunks/sortPostByLikeAsync',
	async (cityId, thunkAPI) => {
		try {
			return await postListService.sortPostByLike(cityId);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// TODO
// sort post list by date from new to old
export const sortPostByDateAsync = createAsyncThunk(
	'postList/thunks/sortPostByDateAsync',
	async (cityId, thunkAPI) => {
		try {
			return await postListService.sortPostByDate(cityId);
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

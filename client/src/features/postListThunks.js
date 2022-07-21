import { createAsyncThunk } from '@reduxjs/toolkit';
import postListService from './postListService';

// get post list by city id, sorted by date from new to old
export const getPostListByCityIdAsync = createAsyncThunk(
	'postList/getPostListByCity',
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

// get post list by user id, sorted by date from new to old
export const getPostListByUserIdAsync = createAsyncThunk(
	'postList/getPostListByUser',
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

// get single post by post id
export const getPostByIdAsync = createAsyncThunk('postList/getPost', async (postId, thunkAPI) => {
	try {
		return await postListService.getPostById(postId);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// delete single post by post id
export const deletePostByIdAsync = createAsyncThunk(
	'postList/deletePost',
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

// edit single post by post id
export const editPostByIdAsync = createAsyncThunk('postList/editPost', async (postId, thunkAPI) => {
	try {
		return await postListService.editPostById(postId);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// increase single post like count by post id
export const increaseLikePostByIdAsync = createAsyncThunk(
	'postList/increaseLikePostById',
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

// decrease single post like count by post id
export const decreaseLikePostByIdAsync = createAsyncThunk(
	'postList/decreaseLikePostById',
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

import { createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

// Register
export const register = createAsyncThunk('user/signup', async (user, thunkAPI) => {
	try {
		return await userService.register(user);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Login
export const login = createAsyncThunk('user/login', async (user, thunkAPI) => {
	try {
		return await userService.login(user);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Edit user info
export const editUser = createAsyncThunk('user/edit', async (user, thunkAPI) => {
	try {
		const token = thunkAPI.getState().user.user.token;
		return await userService.editUser(user, token);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const logout = createAsyncThunk('user/logout', async () => {
	await userService.logout();
});

// handle likePost/unlikepost
export const likePost = createAsyncThunk('user/like&&unlike', async (useridAndpostid, thunkAPI) => {
	try {
		const token = thunkAPI.getState().user.user.token;
		return await userService.likePost(useridAndpostid, token);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

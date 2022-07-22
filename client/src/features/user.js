import { createSlice } from '@reduxjs/toolkit';
import userService from './userService';
import { register, login, editUser, logout, likePost } from './userThunks';

const user = JSON.parse(localStorage.getItem('user'));

const noUserState = {
	id: '-1',
	username: 'visitor',
	password: '',
	introduction:
		"I think the exposure to new places and new people can be really reviving personally and also eye opening to see how other people live. To see how life functions, whether human or natural life, in other places is really humbling. It's easy to have your status quo at home, but as soon as you're in a new place - all bets are off. You can do anything, and are so willing to try new stuff to push your own boundaries purely because you're in a new place.",
	// likedPosts: {'97345116-0409-4b1e-b195-f9c2aa684f90'},
};

const initialState = {
	user: user ? user : null,
	isLogin: user ? true : false,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
			state.message = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
				state.isLogin = true;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
				state.isLogin = true;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
				state.isLogin = false;
			})
			.addCase(editUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(editUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(editUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(likePost.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(likePost.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user.likedPosts = action.payload.likedPosts;
			})
			.addCase(likePost.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			});
	},
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;

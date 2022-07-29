import { createSlice } from '@reduxjs/toolkit';
import userService from './userService';
import { register, login, editUser, logout, likePost, changePassword } from './userThunks';

const user = JSON.parse(localStorage.getItem('user'));

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
				localStorage.setItem('user', JSON.stringify(state.user));
				console.log(state.user.likedPosts);
			})
			.addCase(likePost.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(changePassword.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(changePassword.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(changePassword.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;

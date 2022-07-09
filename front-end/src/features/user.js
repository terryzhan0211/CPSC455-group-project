import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
const noUserState = { id: '-1', username: 'test', password: '', likedPosts: [] };
const INITIAL_STATE = {
	currUser: 'Login',
	users: [
		{ id: '0', username: 'test user 1', password: 'test123', likedPosts: [] },
		{ id: '1', username: 'test user 2', password: 'test123', likedPosts: [] },
	],
	isLogin: false,
};
export const userSlice = createSlice({
	name: 'user',
	initialState: INITIAL_STATE,

	reducers: {
		loginUser: (state, action) => {
			state.isLogin = true;
		},
		logoutUser: (state, action) => {
			state.isLogin = false;
		},
		signupUser: (state, action) => {},
		signoutUser: (state, action) => {},
	},
	// extra reducer of backend database for user
});
export const { loginUser, signupUser } = userSlice.actions;
export default userSlice.reducer;

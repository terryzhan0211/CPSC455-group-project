import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
const noUserState = { id: '-1', username: 'visitor', password: '', likedPosts: [] };
const INITIAL_STATE = {
	currUser: noUserState,
	users: [
		{
			id: '0',
			username: 'test user 1',
			password: 'test123',
			introduction: 'hello',
			likedPosts: [],
		},
		{
			id: '1',
			username: 'test user 2',
			password: 'test123',
			introduction: 'hello',
			likedPosts: [],
		},
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
export const { loginUser, signupUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

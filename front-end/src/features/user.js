import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
const noUserState = {
	id: '-1',
	username: 'visitor',
	password: '',
	introduction:
		"I think the exposure to new places and new people can be really reviving personally and also eye opening to see how other people live. To see how life functions, whether human or natural life, in other places is really humbling. It's easy to have your status quo at home, but as soon as you're in a new place - all bets are off. You can do anything, and are so willing to try new stuff to push your own boundaries purely because you're in a new place.",
	likedPosts: [],
};
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
		editUser: (state, action) => {},
	},
	// extra reducer of backend database for user
});
export const { loginUser, signupUser, logoutUser, editUser } = userSlice.actions;
export default userSlice.reducer;

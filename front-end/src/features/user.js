import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import {
	unlikePostAsync,
} from './thunks';
import { REQUEST_STATE } from './utils';
let noUserState = { id: '-1', username: 'visitor', password: '', likedPosts: ['97345116-0409-4b1e-b195-f9c2aa684f90'] };
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
	unlikePost: REQUEST_STATE.IDLE,
	errors: null,
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
		unlikePost:(state,action) =>{
			let newLikedPosts = state.currUser.likedPosts.filter((postID)=>{
				return postID !== action.payload
			});
			state.currUser.likedPosts = newLikedPosts;
		},
		likePost:(state,action) =>{		
			state.currUser.likedPosts.push(action.payload);
		}
	},
	// extra reducer of backend database for user
	extraReducers:(builder) => {
		builder
			//unlikePost
			.addCase(unlikePostAsync.pending, (state) => {
                state.unlikePost = REQUEST_STATE.PENDING;
            })
            .addCase(unlikePostAsync.fulfilled, (state, action) => {
                state.unlikePost = REQUEST_STATE.FULFILLED;
                state.currUser.likedPosts = state.currUser.likedPosts.filter((postID)=>{return postID !== action.payload});
            })
            .addCase(unlikePostAsync.rejected, (state, action) => {
                state.unlikePost = REQUEST_STATE.REJECTED;
                state.errors = action.error;
            })
	}

});
export const { loginUser, signupUser, logoutUser,unlikePost,likePost } = userSlice.actions;
export default userSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const user = JSON.parse(localStorage.getItem('user'))
const noUserState = {
	id: '-1',
	username: 'visitor',
	password: '',
	introduction:
		"I think the exposure to new places and new people can be really reviving personally and also eye opening to see how other people live. To see how life functions, whether human or natural life, in other places is really humbling. It's easy to have your status quo at home, but as soon as you're in a new place - all bets are off. You can do anything, and are so willing to try new stuff to push your own boundaries purely because you're in a new place.",
	likedPosts: ['97345116-0409-4b1e-b195-f9c2aa684f90'],
};


const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  currUser: noUserState,
}


// Register
export const register = createAsyncThunk(
  'user/signup',
  async (user, thunkAPI) => {
    try {
      return await userService.register(user)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Login
export const login = createAsyncThunk('user/login', async (user, thunkAPI) => {
  try {
    return await userService.login(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('user/logout', async () => {
  await userService.logout()
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
    unlikePost:(state,action) =>{
			let newLikedPosts = state.currUser.likedPosts.filter((postID)=>{
				return postID !== action.payload
			});
			state.currUser.likedPosts = newLikedPosts;
		},
		likePost:(state,action) =>{		
			state.currUser.likedPosts.push(action.payload);
		},
    editUser: (state, action) => {},
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  },
})

export const { reset,unlikePost, likePost,editUser } = userSlice.actions
export default userSlice.reducer

// import { createSlice } from '@reduxjs/toolkit';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { v4 as uuidv4 } from 'uuid';
// const noUserState = { id: '-1', username: 'visitor', password: '', likedPosts: [] };
// const INITIAL_STATE = {
// 	currUser: noUserState,
// 	users: [
// 		{
// 			id: '0',
// 			username: 'test user 1',
// 			password: 'test123',
// 			introduction: 'hello',
// 			likedPosts: [],
// 		},
// 		{
// 			id: '1',
// 			username: 'test user 2',
// 			password: 'test123',
// 			introduction: 'hello',
// 			likedPosts: [],
// 		},
// 	],
// 	isLogin: false,
// };
// export const userSlice = createSlice({
// 	name: 'user',
// 	initialState: INITIAL_STATE,

// 	reducers: {
// 		loginUser: (state, action) => {
// 			state.isLogin = true;
// 		},
// 		logoutUser: (state, action) => {
// 			state.isLogin = false;
// 		},
// 		signupUser: (state, action) => {},
// 		signoutUser: (state, action) => {},
// 	},
// 	// extra reducer of backend database for user
// });
// export const { loginUser, signupUser, logoutUser } = userSlice.actions;
// export default userSlice.reducer;

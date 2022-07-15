import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

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
}


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
export const likePost = createAsyncThunk(
  'user/like&&unlike',
  async (useridAndpostid, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token
      return await userService.likePost(useridAndpostid, token)
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
    // unlikePost:(state,action) =>{
		// 	let newLikedPosts = state.user.likedPosts.filter((postID)=>{
		// 		return postID !== action.payload
		// 	});
		// 	state.user.likedPosts = newLikedPosts;
		// },
		// likePost:(state,action) =>{		
    //   console.log(state.user.likedPosts)
		// 	state.user.likedPosts.push(action.payload.postID);
		// },
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
        state.isLogin = true
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
        state.isLogin = true
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.isLogin = false
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(likePost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user.likedPosts = action.payload.likedPosts
      })
      .addCase(likePost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
  },
})

export const { reset } = userSlice.actions
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

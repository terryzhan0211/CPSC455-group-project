import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	postList: [
		{
			postId: '',
			cityId: '',
			userId: '',
			username: '',
			title: '',
			content: '',
			photos: [],
			likes: 0,
			create_date: '',
		},
	],
};

export const postListSlice = createSlice({
	name: 'postList',
	initialState,
	reducers: {},
});

export const {} = postListSlice.actions;
export default postListSlice.reducer;

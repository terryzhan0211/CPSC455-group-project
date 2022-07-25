import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from '../features/cities.js';
import userReducer from '../features/user.js';
export const store = configureStore({
	reducer: {
		cities: citiesReducer,
		user: userReducer,
	},
	devTools: true,
	// forece it not care about non-serializable data
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

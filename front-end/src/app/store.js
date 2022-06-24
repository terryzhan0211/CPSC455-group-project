import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from '../features/cities.js';
export const store = configureStore({
	reducer: {
		cities: citiesReducer,
	},
	devTools: true,
	// forece it not care about non-serializable data
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

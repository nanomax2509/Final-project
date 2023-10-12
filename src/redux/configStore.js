import { configureStore } from '@reduxjs/toolkit';
import CourseSlice from './slices/Course'
import UserReducer from './slices/User';
import CatalogSlice from './slices/Catalog'
import coursesByCategorySlice from './slices/coursesByCategory'
export const store = configureStore({
	reducer: {
		CourseSlice: CourseSlice,
		UserReducer,
		CatalogSlice:CatalogSlice,
		coursesByCategorySlice:coursesByCategorySlice,
	},
	middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

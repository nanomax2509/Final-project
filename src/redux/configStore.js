import { configureStore } from '@reduxjs/toolkit';
import CourseSlice from './slices/Course'
import UserReducer from './slices/User';
import CatalogSlice from './slices/Catalog'
import InfoDetailSlice from './slices/Detail'
import coursesByCategorySlice from './slices/coursesByCategory'
import SearchSlice from './slices/Search'
export const store = configureStore({
	reducer: {
		CourseSlice: CourseSlice,
		UserReducer,
		CatalogSlice:CatalogSlice,
		coursesByCategorySlice:coursesByCategorySlice,
		CatalogSlice:CatalogSlice,
		InfoDetailSlice:InfoDetailSlice,
		SearchSlice:SearchSlice,
	},
	middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

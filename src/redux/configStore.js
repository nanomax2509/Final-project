import { configureStore } from '@reduxjs/toolkit';
import CourseSlice from './slices/Course'
import UserReducer from './slices/User';
import CatalogSlice from './slices/Catalog'
import InfoDetailSlice from './slices/Detail'
import coursesByCategorySlice from './slices/coursesByCategory'
import SearchSlice from './slices/Search'
import UpdateUser from './slices/UpdateUser';
export const store = configureStore({
	reducer: {
		UserReducer,
		CourseSlice: CourseSlice,
		CatalogSlice:CatalogSlice,
		coursesByCategorySlice:coursesByCategorySlice,
		CatalogSlice:CatalogSlice,
		InfoDetailSlice:InfoDetailSlice,
		SearchSlice:SearchSlice,
		UpdateUser:UpdateUser,
	},
	middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

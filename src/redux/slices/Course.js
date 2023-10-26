// rxslice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCourseByIdApi } from '../../services/course.services';
import { getLocalStorage } from '../../utils';

import axios from 'axios';
const initialState = {
	listCourse: [],
	courseDetail: {},
	isLoading: true,
};
const tokenCyber = getLocalStorage('TOKENCYBER');
export const getThank = createAsyncThunk('Course/getData', async () => {
	const resp = await axios.get(
		"https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01",
		{
		  headers: {
			TokenCybersoft: tokenCyber,
		  },
		}
	  );
  
	return resp.data;
  })
export const getCourseByIdThunk = createAsyncThunk(
	'CourseSlice/abc',
	async () => {
		const resp = await axios.get(
			"https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01",
			{
			  headers: {
				TokenCybersoft: tokenCyber,
			  },
			}
		  );
		// console.log(resp)
		return resp; // chính là action.payload
	}
);

const CourseSlice = createSlice({
	name: 'Course',
	initialState ,
	// switch case ???
	reducers: {
		setListCourse: (state, action) => {
			state.listCourse = action.payload;
			// console.log("action",action)
			
			// không dùng return state;
			// redux + immer => làm giúp nhiệm vụ clone object cho chúng ta rồi.

			// nếu tự return thì phải clone state đó ra
			// {...state}
		},

		setCourseDetail: (state, action) => {
			state.courseDetail = action.payload;
		},
	},
	extraReducers: (builder) => {
		// builder.addCase(getCourseByIdThunk.pending, (state, action) => {
		// 	// console.log(action);
		// 	// đang call api
		// 	state.isLoading = true;
		// });

		builder.addCase(getThank.fulfilled, (state, action) => {
			// console.log(action);
			// console.log(state,'staate')
			// state.courseDetail = action.payload.data.content;
			state.listCourse = action.payload;
			// console.log(action.payload,'payload');
			// set lại isLoading = false.
			state.isLoading = false;
		});
	},
});


// action creator
export const { setListCourse, setCourseDetail } = CourseSlice.actions;

export default CourseSlice.reducer;

// const ListProductReducer = (state, action) => {
// 	switch (action.type) {
// 		default:
// 			return state;
// 	}
// };

// (state,action) =>{}

// const createSlice = ({ name, initialState, reducers }) => {
// 	return {
// 		reducer: (state, action) => {
// 			switch (action.type) {
// 				default:
// 					return state;
// 			}
// 		},
// 	};
// };

// const { reducer } = createSlice({});
// export default reducer;

// ---------------------------------------
// tái sử dụng: call api xong, đẩy lên trên redux

// closure function. có thể sử dụng tất cả giá trị biến ở phạm vi function cha.

// Tốn 2 bước.
export const getCourseByIdAction = (id) => {
	// return về function
	return async (dispatch) => {
		// middleware: thunk.
		const resp = await getCourseByIdApi(id);

		const action = setCourseDetail(resp.data.content);

		// dispatch: middle thunk, trả ra
		// dispatch: đẩy dữ liệu lên trên redux
		dispatch(action);
	};
};

// function callApi(b) {
// 	var b = b;
// 	const a = 10; // clear
// 	return a + 20;
// } // kết thúc thì biến "a" | "b" bị clear đi.
// console.log(callApi());

// function callApi() {
// 	const a = 10;
// 	return () => {
// 		console.log(a); // "a": không bị clear đi.
// 	};
// }

// callApi();

// IIFE: hàm gọi liền

// rxslice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCourseByCategoryIdApi } from '../../services/coursesByCategory.services';
const initialState = {
	listCbc: [],
	isLoading: false,
};
export const getThank = createAsyncThunk('CBC/getData', async (id) => {
	const resp = await axios.get(
		`https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${id}&MaNhom=GP01`,
		{
		  headers: {
			TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MDA4IiwiSGV0SGFuU3RyaW5nIjoiMjgvMDEvMjAyNCIsIkhldEhhblRpbWUiOiIxNzA2NDAwMDAwMDAwIiwibmJmIjoxNjc3NDMwODAwLCJleHAiOjE3MDY1NDc2MDB9.eo3y0MmcjE8Jl4fRzUJLBoZzylEeFDcUTfWXvtb1hdc',
		  },
		}
	  );
console.log("jsCbc",resp)
  
	return resp.data;
  })
export const getCbCByIdThunk = createAsyncThunk(	
	'coursesByCategory/CBC',
	async (id) => {
        const resp = await axios.get(
            `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=Tuduy&maNhom=GP03`,
            {
              headers: {
                TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MDA4IiwiSGV0SGFuU3RyaW5nIjoiMjgvMDEvMjAyNCIsIkhldEhhblRpbWUiOiIxNzA2NDAwMDAwMDAwIiwibmJmIjoxNjc3NDMwODAwLCJleHAiOjE3MDY1NDc2MDB9.eo3y0MmcjE8Jl4fRzUJLBoZzylEeFDcUTfWXvtb1hdc',
              },
            }
          );
    console.log("jsCbc",resp)
		return resp.data; // chính là action.payload
	}
);

const coursesByCategorySlice = createSlice({
	name: 'CBC',
	initialState ,
	// switch case ???
	reducers: {
		setListCbC: (state, action) => {
			state.listCbc = action.payload;
			// console.log("action",action.payload)
            
		},
	},
	extraReducers: (builder) => {


		builder.addCase(getThank.fulfilled, (state, action) => {

			state.listCbc = action.payload;
			console.log(action.payload,"acction")
			state.isLoading = false;
		});
	},
    });


export const { setListCbC, setCoursesByCategoryDetail } = coursesByCategorySlice.actions;

export default coursesByCategorySlice.reducer;

export const getCourseByCategoryAction = (id) => {
	return async (dispatch) => {
		// middleware: thunk.
		const resp = await getCourseByCategoryIdApi(id);
		const action = setCoursesByCategoryDetail(resp.data.content);
		dispatch(action);
	};
};
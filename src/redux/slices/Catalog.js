// rxslice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCatalogCourse } from '../../services/catalog.services';
import axios from 'axios';
const initialState = {
	listCatalog: [],
	isLoading: false,
};
export const getThank = createAsyncThunk('CatalogCourse/getData', async () => {
	const resp = await axios.get(
		"https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc",
		{
		  headers: {
			TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MDA4IiwiSGV0SGFuU3RyaW5nIjoiMjgvMDEvMjAyNCIsIkhldEhhblRpbWUiOiIxNzA2NDAwMDAwMDAwIiwibmJmIjoxNjc3NDMwODAwLCJleHAiOjE3MDY1NDc2MDB9.eo3y0MmcjE8Jl4fRzUJLBoZzylEeFDcUTfWXvtb1hdc',
		  },
		}
	  );
// console.log("jscata",resp)
  
	return resp.data;
  })
export const getCourseByIdThunk = createAsyncThunk(
	'Catalog/abc',
	async () => {
		const resp = await axios.get(
			"https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01",
			{
			  headers: {
				TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MDA4IiwiSGV0SGFuU3RyaW5nIjoiMjgvMDEvMjAyNCIsIkhldEhhblRpbWUiOiIxNzA2NDAwMDAwMDAwIiwibmJmIjoxNjc3NDMwODAwLCJleHAiOjE3MDY1NDc2MDB9.eo3y0MmcjE8Jl4fRzUJLBoZzylEeFDcUTfWXvtb1hdc',
			  },
			}
		  );
		console.log(resp)
		return resp; // chính là action.payload
	}
);

const CatalogSlice = createSlice({
	name: 'CatalogCourse',
	initialState ,
	// switch case ???
	reducers: {
		setListCatalog: (state, action) => {
			state.listCatalog = action.payload;
			console.log("action",action.payload)
            
		},
	},
    extraReducers: (builder) => {
        builder.addCase(getThank.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(getThank.fulfilled, (state, action) => {
          // Kiểm tra xem đã có payload nào được gán vào listCatalog chưa
          if (state.listCatalog.length === 0) {
            state.listCatalog = action.payload;
          }
          state.isLoading = false;
        });
        builder.addCase(getThank.rejected, (state) => {
          state.isLoading = false;
        });
      },
    });


export const { setCatalogCourse, setCatalogDetail } = CatalogSlice.actions;

export default CatalogSlice.reducer;

export const getCatalogCourseAction = (id) => {
	return async (dispatch) => {
		// middleware: thunk.
		const resp = await getCatalogCourse(id);
		const action = setCatalogDetail(resp.data.content);
		dispatch(action);
	};
};

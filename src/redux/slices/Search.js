import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSearchByIdApi } from '../../services/search.services';
import axios from 'axios';
const initialState = {
	listSearch: [],
	SearchDetail: {},
	isLoading: true,
	SearchTerm: {},
};
export const getThank = createAsyncThunk('Search/getData', async (id) => {
	console.log(id,"idsearch")
	const resp = await axios.get(
		`https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${id}&MaNhom=GP01`,
		{
		  headers: {
			TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MDA4IiwiSGV0SGFuU3RyaW5nIjoiMjgvMDEvMjAyNCIsIkhldEhhblRpbWUiOiIxNzA2NDAwMDAwMDAwIiwibmJmIjoxNjc3NDMwODAwLCJleHAiOjE3MDY1NDc2MDB9.eo3y0MmcjE8Jl4fRzUJLBoZzylEeFDcUTfWXvtb1hdc',
		  },
		}
	  );
	return resp.data;
  })
export const getSearchByIdThunk = createAsyncThunk(
	'Search/abc',
	async (id) => {
		const resp = await axios.get(
			`https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${id}&MaNhom=GP01`,
			{
			  headers: {
				TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MDA4IiwiSGV0SGFuU3RyaW5nIjoiMjgvMDEvMjAyNCIsIkhldEhhblRpbWUiOiIxNzA2NDAwMDAwMDAwIiwibmJmIjoxNjc3NDMwODAwLCJleHAiOjE3MDY1NDc2MDB9.eo3y0MmcjE8Jl4fRzUJLBoZzylEeFDcUTfWXvtb1hdc',
			  },
			}
		  );
		return resp; 
	}
);

const SearchSlice = createSlice({
	name: 'Search',
	initialState ,
	reducers: {
		setListSearch: (state, action) => {
			state.listSearch = action.payload;
			console.log(state.listSearch,"state")

		},

		setListDetail: (state, action) => {
			state.SearchDetail = action.payload;
		},
	},
	extraReducers: (builder) => {

		builder.addCase(getThank.fulfilled, (state, action) => {

			state.listSearch = action.payload;
			state.isLoading = false;
		});
	},
});


export const { setListSearch, setSearchDetail } = SearchSlice.actions;

export default SearchSlice.reducer;

export const getSearchByIdAction = (id) => {
	return async (dispatch) => {
		const resp = await getSearchByIdApi(id);
		const action = setSearchDetail(resp.data.content);
		dispatch(action);
	};
};


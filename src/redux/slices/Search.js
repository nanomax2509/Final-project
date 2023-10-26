import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSearchByIdApi } from '../../services/search.services';
import { getLocalStorage } from '../../utils';

import axios from 'axios';
const initialState = {
	listSearch: [],
	SearchDetail: {},
	isLoading: true,
	SearchTerm: {},
};
const tokenCyber = getLocalStorage('TOKENCYBER');

export const getThank = createAsyncThunk('Search/getData', async (id) => {
	console.log(id,"idsearch")
	const resp = await axios.get(
		`https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${id}&MaNhom=GP01`,
		{
		  headers: {
			TokenCybersoft: tokenCyber,
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
				TokenCybersoft: tokenCyber,
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


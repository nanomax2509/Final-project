// rxslice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getDetailApi } from '../../services/detail.services';
const initialState = {
	infoDetail: [],
	isLoading: false,
};
export const getThank = createAsyncThunk('DetailData/getData', async (id) => {
	const resp = await axios.get(
		`https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${id}`,
		{
		  headers: {
			TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MDA4IiwiSGV0SGFuU3RyaW5nIjoiMjgvMDEvMjAyNCIsIkhldEhhblRpbWUiOiIxNzA2NDAwMDAwMDAwIiwibmJmIjoxNjc3NDMwODAwLCJleHAiOjE3MDY1NDc2MDB9.eo3y0MmcjE8Jl4fRzUJLBoZzylEeFDcUTfWXvtb1hdc',
		  },
		}
	  );
console.log("detail",resp)
  
	return resp.data;
  })
export const getDetailByIdThunk = createAsyncThunk(	
	'DetailData/CBC',
	async (id) => {
        const resp = await axios.get(
            `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${id}`,
            {
              headers: {
                TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MDA4IiwiSGV0SGFuU3RyaW5nIjoiMjgvMDEvMjAyNCIsIkhldEhhblRpbWUiOiIxNzA2NDAwMDAwMDAwIiwibmJmIjoxNjc3NDMwODAwLCJleHAiOjE3MDY1NDc2MDB9.eo3y0MmcjE8Jl4fRzUJLBoZzylEeFDcUTfWXvtb1hdc',
              },
            }
          );
    // console.log("jsCbc",resp)
		return resp.data; // chính là action.payload
	}
);

const InfoDetailSlice = createSlice({
	name: 'DetailData',
	initialState ,
	// switch case ???
	reducers: {
		setInfoDetail: (state, action) => {
			state.infoDetail = action.payload;
			// console.log("action",action.payload)
            
		},
	},
	extraReducers: (builder) => {


		builder.addCase(getThank.fulfilled, (state, action) => {

			state.infoDetail = action.payload;
			console.log(action.payload,"acction")
			state.isLoading = false;
		});
	},
    });


export const { setInfoDetail, setInfoDetailAction } = InfoDetailSlice.actions;

export default InfoDetailSlice.reducer;

export const getDetailAction = (id) => {
	return async (dispatch) => {
		// middleware: thunk.
		const resp = await getDetailApi(id);
		const action = setInfoDetailAction(resp.data.content);
		dispatch(action);
	};
};
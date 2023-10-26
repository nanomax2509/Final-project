// rxslice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getLocalStorage } from '../../utils';
import { getCourseByCategoryIdApi } from '../../services/coursesByCategory.services';
const initialState = {
	listCbc: [],
	isLoading: false,
};
const tokenCyber = getLocalStorage('TOKENCYBER');

export const getThank = createAsyncThunk('CBC/getData', async (id) => {
	const resp = await axios.get(
		`https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${id}&MaNhom=GP01`,
		{
		  headers: {
			TokenCybersoft: tokenCyber,
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
                TokenCybersoft: tokenCyber,
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
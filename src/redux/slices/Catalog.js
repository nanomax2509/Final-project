// rxslice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCatalogCourse } from '../../services/catalog.services';
import axios from 'axios';
import { getLocalStorage } from '../../utils';
const initialState = {
	listCatalog: [],
	isLoading: false,
};
const tokenCyber = getLocalStorage('TOKENCYBER');
export const getThank = createAsyncThunk('CatalogCourse/getData', async () => {
	const resp = await axios.get(
		"https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc",
		{
		  headers: {
			TokenCybersoft: tokenCyber,
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
				TokenCybersoft: tokenCyber,
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

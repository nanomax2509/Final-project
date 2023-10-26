import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getLocalStorage } from '../../utils';
import { axiosWithAuth } from '../../services/config.services';

const initialState = {
  userProfile: {},
};
const tokenCyber = getLocalStorage('TOKENCYBER');

export const getProfileThunk = createAsyncThunk(
  'UserSlice/getDataProfile',
  async () => {
    const token = getLocalStorage('ACCESS_TOKEN');
    
    try {
      const resp = await axios.post(
        'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinNguoiDung',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            TokenCybersoft: tokenCyber,
          },
        }
      );
      return resp;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    resetUserProfile: (state, action) => {
      state.userProfile = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfileThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload.data;
    });
  },
});

export const { resetUserProfile } = UserSlice.actions;

export default UserSlice.reducer;
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getLocalStorage } from '../../utils';
import { ACCESS_TOKEN } from '../../constant';
import { axiosWithAuth } from '../../services/config.services';

const initialState = {
  userProfile: {},
};

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
            TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MDA4IiwiSGV0SGFuU3RyaW5nIjoiMjgvMDEvMjAyNCIsIkhldEhhblRpbWUiOiIxNzA2NDAwMDAwMDAwIiwibmJmIjoxNjc3NDMwODAwLCJleHAiOjE3MDY1NDc2MDB9.eo3y0MmcjE8Jl4fRzUJLBoZzylEeFDcUTfWXvtb1hdc',
          },
        }
      );
        console.log(resp.data)
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
      console.log(action,'action')
      console.log(state.userProfile,"state")

    });
  },
});

export const { resetUserProfile } = UserSlice.actions;

export default UserSlice.reducer;
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getLocalStorage } from '../../utils';
import { axiosWithAuth } from '../../services/config.services';


const initialState = {
  userProfile: {},
  isUpdating: false,
  updateError: null,
};
const tokenCyber = getLocalStorage('TOKENCYBER');

export const updateProfileThunk = createAsyncThunk(
  'UpdateUserSlice/updateProfile',
  async (updatedData) => {
    const token = getLocalStorage('ACCESS_TOKEN');

    try {
      const resp = await axios.put(
        'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            TokenCybersoft: tokenCyber,
          },
        }
      );

      return resp.data;
    } catch (error) {
      throw error;
    }
  }
);

const UpdateUserSlice = createSlice({
  name: 'UpdateUserSlice',
  initialState,
  reducers: {
    resetUserProfile: (state) => {
      state.userProfile = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfileThunk.pending, (state) => {
        state.isUpdating = true;
        state.updateError = null;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.userProfile = action.payload;
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.isUpdating = false;
        state.updateError = action.error.message;
      });
  },
});

export const { resetUserProfile } = UpdateUserSlice.actions;

export default UpdateUserSlice.reducer;
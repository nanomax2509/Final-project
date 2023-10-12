import axios from 'axios';
import { saveLocalStorage } from '../utils';

const BASE_URL = 'https://elearningnew.cybersoft.edu.vn';

export const RegisterApi = async (id) => {
  try {
    const resp = await axios.post(
      `${BASE_URL}/api/QuanLyNguoiDung/DangKy`,
      {
        // Thêm các thông tin cần thiết để đăng ký người dùng
      },
      {
        headers: {
          Authorization: `Bearer ${id}`, // Sử dụng token trong header Authorization
        },
      }
    );

    const token = resp.data.token;
    saveLocalStorage('token', token);
    return token;
  } catch (err) {
    throw new Error(err);
  }
};
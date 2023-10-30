import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getProfileThunk } from '../../redux/slices/User';
import { getLocalStorage } from '../../utils';
import { NavLink } from 'react-router-dom';
import './ProfileForm.scss'

function ProfileForm() {
  const { userProfile } = useSelector((state) => state.UserReducer);
  const tokenCyber = getLocalStorage('TOKENCYBER');
  const token = getLocalStorage('ACCESS_TOKEN');

  const [updatedProfile, setUpdatedProfile] = useState({
    hoTen: userProfile.hoTen,
    email: userProfile.email,
    soDT: userProfile.soDT,
    maLoaiNguoiDung: userProfile.maLoaiNguoiDung,
    maNhom: userProfile.maNhom,
    matKhau: userProfile.matKhau,
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const updateProfile = async () => {
    try {
      const resp = await axios.put(
        'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
        {
          taiKhoan: userProfile.taiKhoan,
          matKhau: userProfile.matKhau,
          hoTen: updatedProfile.hoTen,
          soDT: updatedProfile.soDT,
          maNhom: userProfile.maNhom,
          maLoaiNguoiDung: userProfile.maLoaiNguoiDung,
          email: updatedProfile.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            TokenCybersoft: tokenCyber,
          },
        }
      );

      const { data } = resp;
      console.log(data, 'datauser');
      setIsSuccess(true); // Set isSuccess to true on successful update
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin:', error);
      throw error;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const saveChanges = () => {
    updateProfile();
  };

  return (
    <div className="profile-Form">
      <h2>Thay đổi thông tin</h2>
      {isSuccess ? (
       <div className='profileFormPopup'>
       <div className='profileFormPopup-content'>
         <p>Thay đổi thông tin thành công!</p>
         <div>
         <NavLink className='btnOK' to={'/profile'} onClick={() => setIsSuccess(false)}>OK</NavLink>
         </div>
       </div>
     </div>
     
      
      ) : (
        <div>
          <div>
            <label>Họ tên:</label>
            <input
              type="text"
              name="hoTen"
              value={updatedProfile.hoTen}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={updatedProfile.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Mật khẩu:</label>
            <input
              type="password"
              name="matKhau"
              value={updatedProfile.matKhau}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>SĐT:</label>
            <input
              type="tel"
              name="soDT"
              value={updatedProfile.soDT}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Mã Loại Người Dùng:</label>
            <input
              type="text"
              name="maLoaiNguoiDung"
              value={updatedProfile.maLoaiNguoiDung}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div>
            <label>Mã Nhóm:</label>
            <input
              type="text"
              name="maNhom"
              value={updatedProfile.maNhom}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <button className='btnCapNhat' onClick={saveChanges}>Lưu thay đổi</button>
        </div>
      )}
    </div>
  );
}

export default ProfileForm;
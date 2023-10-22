import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileThunk } from '../../redux/slices/User';
import { getLocalStorage } from '../../utils';
function Profile() {
  const { userProfile } = useSelector((state) => state.UserReducer);
  console.log(userProfile)
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProfile = async () => {
      dispatch(getProfileThunk());
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h1>Thông tin người dùng/Chỉnh sửa thông tin</h1>
      <div>
        <h3>Tài khoản: {userProfile.taiKhoan}</h3>
      </div>
      <div>
        <label>Họ tên:</label>
        <input type='text' value={userProfile.hoTen}  />
      </div>
      <div>
        <label>Email:</label>
        <input type='text' value={userProfile.email}  />
      </div>
      <div>
        <label>Mật khẩu:</label>
        <input type='password' value={userProfile.matKhau}  />
      </div>
      <div>
        <label>SĐT:</label>
        <input type='text' value={userProfile.soDT}  />
      </div>
	  <button >Cập nhật tài khoản</button>
    </div>
  );
}

export default Profile;
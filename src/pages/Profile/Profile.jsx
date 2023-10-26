import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileThunk } from '../../redux/slices/User';
import './Profile.scss';
import { getLocalStorage } from '../../utils';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
function Profile() {
	const { userProfile } = useSelector((state) => state.UserReducer);
	console.log(userProfile, "edit")

	const [userProfile1, setUserProfile] = useState(null);
	const updateUserProfile = (newProfileData) => {
		setUserProfile(newProfileData);
	};
	const handleEditProfile = () => {
		setIsEditing(!isEditing);
	};
	const [isEditing, setIsEditing] = useState(false);
	const dispatch = useDispatch();

	const [activeTab, setActiveTab] = useState('personal');

	const tokenCyber = getLocalStorage('TOKENCYBER');
	const token = getLocalStorage('ACCESS_TOKEN');
	const initialProfile = { ...userProfile }; // Tạo bản sao của userProfile ban đầu
	const [updatedProfile, setUpdatedProfile] = useState(initialProfile);
	const data = getLocalStorage('LOGIN_DATA');
	updatedProfile.email = data.email;
	updatedProfile.taiKhoan = data.taiKhoan;
	updatedProfile.matKhau = data.matKhau;
	updatedProfile.hoTen = data.hoTen;
	updatedProfile.soDT = data.soDT;
	updatedProfile.maNhom = data.maNhom;
	updatedProfile.maLoaiNguoiDung = data.maLoaiNguoiDung;


	const [showPopup, setShowPopup] = useState(false);
	const showConfirmationPopup = () => {
		setShowPopup(true);
	}
	const updateProfile = async () => {
		try {
			const resp = await axios.put(
				'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
				{
					taiKhoan: updatedProfile.taiKhoan,
					matKhau: updatedProfile.matKhau,
					hoTen: updatedProfile.hoTen,
					soDT: updatedProfile.soDT,
					maNhom: updatedProfile.maNhom,
					maLoaiNguoiDung: updatedProfile.maLoaiNguoiDung,
					email: updatedProfile.email,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						TokenCybersoft:
							tokenCyber,
					},
				}
			);

			const { data } = resp;
			console.log(data, 'datauser');
		} catch (error) {
			console.error('Lỗi khi cập nhật thông tin:', error);
			throw error;
		}
	};
	const fetchUserProfile = async () => {
		try {
			const resp = await axios.post(
				'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinNguoiDung'
				,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						TokenCybersoft:
							tokenCyber,
					},
				});
			const userProfileData = resp.data;
			console.log(userProfileData, "datapro")

			setUserProfile(userProfileData);
		} catch (error) {
			console.error('Lỗi khi tải hồ sơ người dùng:', error);
		}
	};
	useEffect(() => {
		const fetchProfile = async () => {
			dispatch(getProfileThunk());
		};

		fetchProfile();
	}, []);

	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};


	console.log(userProfile.taiKhoan, 'taikh')
	const handleDeleteCourse = async maKhoaHoc => {
		try {
			const resp = await axios.post(
				'https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/HuyGhiDanh',
				{
					maKhoaHoc: maKhoaHoc,
					taiKhoan: userProfile.taiKhoan,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						TokenCybersoft:
							'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MDA4IiwiSGV0SGFuU3RyaW5nIjoiMTEvMDIvMjAyNCIsIkhldEhhblRpbWUiOiIxNzA3NjA5NjAwMDAwIiwibmJmIjoxNjc3NDMwODAwLCJleHAiOjE3MDc3NTcyMDB9.jYwLdihIAtWFb2Knge-baquBX9pHt9Z8tScXQFuYk0Y',
					},
				}
			);
			fetchUserProfile();
			console.log(resp, 'xoa');

			// Xoá thẻ đã huỷ khỏi mảng userProfile.chiTietKhoaHocGhiDanh
			const updatedProfile = { ...userProfile };
			updatedProfile.chiTietKhoaHocGhiDanh = updatedProfile.chiTietKhoaHocGhiDanh.filter(course => course.maKhoaHoc !== maKhoaHoc);
			setUserProfile(updatedProfile);
			showConfirmationPopup();

			// Reload the page after a delay
			setTimeout(() => {
				window.location.reload();
			}, 2000); // Adjust the delay as needed
		} catch (error) {
			console.error('Lỗi khi xoá:', error);
		}
	};
	return (
		<div className="profile-container">
			<div className="sidebar">
				<button
					className={activeTab === 'personal' ? 'active' : ''}
					onClick={() => handleTabChange('personal')}
				>
					Thông tin cá nhân
				</button>
				<button
					className={activeTab === 'course' ? 'active' : ''}
					onClick={() => handleTabChange('course')}
				>
					Khoá học của tôi
				</button>
			</div>
			<div className="main-content">
				{activeTab === 'personal' && (
					
					<div className="personal-info ">
						<h2 className='p-3'>Thông tin cá nhân</h2>
						<div className='row'>
						<div className='profileInfo col-6 '>
						<label>Tài Khoản:</label>
							<span>{userProfile.taiKhoan}</span>
						</div>
						<div className='profileInfo col-6'>
							<label>Họ Tên:</label>
							<span>{userProfile.hoTen}</span>
						</div>
						<div className='profileInfo col-6'>
							<label>Email:</label>
							<span>{userProfile.email}</span>
						</div>
						<div className='profileInfo col-6'>
							<label>SĐT:</label>
							<span>{userProfile.soDT}</span>
						</div>
						<div className='profileInfo col-6'>
							<label>Mã Nhóm:</label>
							<span>{userProfile.maNhom}</span>
						</div>
						<div className='profileInfo col-6'>
							<label>Mã loại người dùng:</label>
							<span>{userProfile.maLoaiNguoiDung}</span>
						</div>
						</div>
						<NavLink to={'/profileForm'}>Thay đổi thông tin</NavLink>
					</div>
				)}
				{activeTab === 'course' && (
					<div className="course-info">
						<div className="courseTitle d-flex">
							<h3>Các khoá học đã tham gia</h3>
							<div className="courseSearch">
								<input
									type="text"
									className="form-control"
									placeholder="Nhập để tìm kiếm khoá học"
									id="searchCourse"
								/>
							</div>
						</div>
						<div className="myCourse">
							{userProfile?.chiTietKhoaHocGhiDanh?.map((user) => (
								<div key={user.maKhoaHoc} className="courseItem">
									<div className="cardMyCourse">
										<img src={user.hinhAnh} alt="" className='w-25' />
										<div className="titleMyCourse">
											<h4>{user.tenKhoaHoc}</h4>
											<p>{user.moTa.slice(0, 300)}...</p>
											<button className='cancelButton' onClick={() => handleDeleteCourse(user.maKhoaHoc)}>Huỷ</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

				)}
				{showPopup && (
					<div className="popup">
						<div className="popup-content">
							<h3>Lớp đã được huỷ</h3>
							<p>Cập nhật lại trang sau...</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Profile;
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { getLocalStorage, saveLocalStorage } from '../../utils/index';
import { ACCESS_TOKEN } from '../../constant/index';
import { useNavigate } from 'react-router-dom';
import './Login.scss'
import { NavLink } from 'react-router-dom';

// import FacebookLogin from '../../components/FacebookLogin/FacebookLogin';
const token = getLocalStorage('ACCESS_TOKEN');
const schemaLogin = Yup.object({
	taiKhoan: Yup.string()
    .required('Tên người dùng là bắt buộc')
    .min(2, 'Phải có ít nhất 2 ký tự')
    .max(10, 'Phải có tối đa 10 ký tự'),
	password: Yup.string()
		.required('Password is required')
		.min(6, 'Must be at least 6 characters')
		.max(10, 'Must be 10 characters or less'),
});

function Login() {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState('');

	const formik = useFormik({
		initialValues: {
			taiKhoan: 'quocanh11',
			matKhau: '123123',
		},

		validationSchema: schemaLogin,

		onSubmit: async (values) => {
			try {
				console.log({ values });
				// call api login
				const resp = await axios.post(
					'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap',
					{
						taiKhoan: values.taiKhoan,
						matKhau: values.matKhau,
					},
					{
						headers: {
						  TokenCybersoft: `${token}`, 
						},
					  }

				);
				console.log({ resp });

				// lưu vào storage
				navigate('/profile');
				// public: ai cũng có thể gọi được hết.

				// private: cần phải xác định được danh tính bạn là ai thì mới được phép gọi những api đó.

				// tạo thẻ từ: chứa tất cả thông tin của các bạn.

				// accessToken: dựa vào đây để xem thử bạn có được phép gọi những api đó hay không.
				// redux. mỗi lần reload page => mất.
				// localStrogate. => không bị mất mỗi lần reload page.
			} catch (err) {
				console.log(err);
				setErrorMessage('Đăng nhập lỗi!!! Sai tài khoản hoặc mật khẩu, vui lòng đăng nhập lại.'); 

			}
		},
	});

	return (
		<form className='login-input' onSubmit={formik.handleSubmit}>
			<h1 className='login-title'>Đăng nhập</h1>
			<hr className='m-5'/>
			<div className='login-input'>
				<label className='d-block'>Tài khoản</label>
				<input className='w-25 p-2' type='text' name='taiKhoan' {...formik.getFieldProps('taiKhoan')} />
				{formik.errors.taiKhoan && formik.touched.taiKhoan && (
					<p className='text-danger'>{formik.errors.taiKhoan}</p>
				)}
			</div>
			<div>
				<label className='d-block mt-3'>Mật khẩu</label>
				<input className='w-25 p-2'
					type='password'
					name='matKhau'
					{...formik.getFieldProps('matKhau')}
				/>
				{formik.errors.matKhau && formik.touched.matKhau && (
					<p className='text-danger'>{formik.errors.matKhau}</p>
				)}
			</div>
			<div className='d-flex login-btn-form '>
			<NavLink className={"login-navlink"} to='/register'>Register now ?</NavLink>
			<button className='btn btn-success btn-login' type='submit'>Login</button>
			</div>
			{/* <FacebookLogin/>		 */}
			{errorMessage && <p className="text-danger login-error d-block">{errorMessage}</p>}
					
		</form>
	);
}

export default Login;

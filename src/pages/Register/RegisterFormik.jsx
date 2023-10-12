import React, { useState } from 'react';
import './Register.scss';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { getLocalStorage, saveLocalStorage } from '../../utils/index';
import { ACCESS_TOKEN } from '../../constant';
const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
const schemaRegister = Yup.object({
  email: Yup.string().email().required('Email là bắt buộc'),
  taiKhoan: Yup.string()
    .required('Tên người dùng là bắt buộc')
    .min(2, 'Phải có ít nhất 2 ký tự')
    .max(10, 'Phải có tối đa 10 ký tự'),
  matKhau: Yup.string()
    .required('Mật khẩu là bắt buộc')
    .min(6, 'Phải có ít nhất 6 ký tự')
    .max(10, 'Phải có tối đa 10 ký tự'),
  soDT: Yup.string()
    .required('Số điện thoại là bắt buộc')
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
});

function RegisterFormik() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const token = getLocalStorage('ACCESS_TOKEN');
  const formik = useFormik({
    initialValues: {
      taiKhoan: 'quocanh1',
      matKhau: '123123',
      hoTen: 'nguyen',
      soDT: '1231231213',
      maNhom: 'GP01',
      maLoaiNguoiDung: 'HV',
      email: 'nguyen@gmail.com',
    },
    validationSchema: schemaRegister,
    onSubmit: async (values) => {
      try {
        const resp = await axios.post(
          'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy',
          {
            taiKhoan: values.taiKhoan,
            matKhau: values.matKhau,
            hoTen: values.hoTen,
            soDT: values.soDT,
            maNhom: values.maNhom,
            maLoaiNguoiDung: values.maLoaiNguoiDung,
            email: values.email,
          },
          {
            headers: {
              TokenCybersoft: `${token}`,
            },
          }
        );
        const { data } = resp;
        console.log(data);
        navigate('/login');
      } catch (err) {

        console.log(values);
        console.log(token);
        console.log(err);
        setErrorMessage(
          'Đăng ký thất bại. Email đã được sử dụng. Vui lòng sử dụng email khác!'
        );
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 className="register-title mt-3">Đăng ký</h1>
      <div className="row">
        <div className="col-6  register-col">
          <label className="d-block mt-3">Tài khoản:</label>
          <input
            className="form-control register-input"
            type="text"
            name="taiKhoan"
            {...formik.getFieldProps('taiKhoan')}
          />
          {formik.errors.taiKhoan && formik.touched.taiKhoan && (
            <p className="text-danger">{formik.errors.taiKhoan}</p>
          )}
        </div>

        <div className="col-6 register-col">
          <label className="d-block mt-3">Mật khẩu:</label>
          <input
            className="form-control register-input"
            type="password"
            name="matKhau"
            {...formik.getFieldProps('matKhau')}
          />
          {formik.errors.matKhau && formik.touched.matKhau && (
            <p className="text-danger">{formik.errors.matKhau}</p>
          )}
        </div>

        <div className="col-6 register-col">
          <label className="d-block mt-3">Họ tên:</label>
          <input
            className="form-control register-input"
            type="text"
            name="hoTen"
            {...formik.getFieldProps('hoTen')}
          />
          {formik.errors.hoTen && formik.touched.hoTen && (
            <p className="text-danger">{formik.errors.hoTen}</p>
          )}
        </div>
        <div className="col-6 register-col">
          <label className="d-block mt-3">Số điện thoại:</label>
          <input
            className="form-control register-input"
            type="text"
            name="soDT"
            {...formik.getFieldProps('soDT')}
          />
          {formik.errorssoDT && formik.touched.soDT && (
            <p className="text-danger">{formik.errors.soDT}</p>
          )}
        </div>
        <div className="col-6 register-col">
          <label className="d-block mt-3">Mã nhóm:</label>
          <input
            className="form-control register-input"
            type="text"
            name="maNhom"
            {...formik.getFieldProps('maNhom')}
          />
          {formik.errors.maNhom && formik.touched.maNhom && (
            <p className="text-danger">{formik.errors.maNhom}</p>
          )}
        </div>
        <div className="col-6  register-col">
          <label className="d-block mt-3">Email:</label>
          <input
            className="form-control register-input"
            type="text"
            name="email"
            {...formik.getFieldProps('email')}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-danger">{formik.errors.email}</p>
          )}
        </div>
      </div>
            <div>
            <button className="btn btn-primary mt-4 btn-submit d-block mx-auto" type="submit">
        Đăng ký
      </button>
      {errorMessage && <p className="text-danger mt-2 text-center">{errorMessage}</p>}
            </div>
     
    </form>
  );
}

export default RegisterFormik;
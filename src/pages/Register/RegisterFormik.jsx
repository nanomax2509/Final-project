  import React, { useState } from 'react';
  import './Register.scss';
  import { useFormik } from 'formik';
  import { useNavigate } from 'react-router-dom';
  import * as Yup from 'yup';
  import axios from 'axios';
  import { getLocalStorage, saveLocalStorage } from '../../utils/index';
  const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
  const maNhomRegExp = 'GP01';
  const schemaRegister = Yup.object({
    email: Yup.string().email().required('Email là bắt buộc'),
    taiKhoan: Yup.string()
      .required('Tên người dùng là bắt buộc')
      .min(6, 'Tài khoản phải có ít nhất 6 ký tự')
      .max(20, 'Tài khoản chỉ có tối đa 20 ký tự'),
    matKhau: Yup.string()
      .required('Mật khẩu là bắt buộc')
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .max(20, 'Mật khẩu chỉ có tối đa 20 ký tự'),
      hoTen: Yup.string().required('Họ tên là bắt buộc'),
      soDT: Yup.string().required('Số điện thoại là bắt buộc')
        .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
      maNhom: Yup.string()
        .required('Mã nhóm là bắt buộc')
        .matches(maNhomRegExp, 'Mã nhóm không hợp lệ'),
  });



  function RegisterFormik() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const tokenCyber = getLocalStorage('TOKENCYBER');
    const formik = useFormik({
      initialValues: {
        taiKhoan: '',
        matKhau: '',
        hoTen: '',
        soDT: '',
        maNhom: 'GP01',
        maLoaiNguoiDung: 'HV',
        email: '',
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
                TokenCybersoft: tokenCyber,
              },
            }
          );
          const { data } = resp;
          console.log(data);
          navigate('/login');
        } catch (err) {
          console.log(err);
          setErrorMessage(
            `Đăng ký thất bại. ${err.response.data} Vui lòng đăng ký lại !!!`
          );
        }
      },
    });
    return (
      <form onSubmit={formik.handleSubmit}>
        <h1 className="register-title mt-3">Đăng ký</h1>
        <div className="row register-row">
          <div className="col-6  register-col register-left">
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

          <div className="col-6 register-col register-right">
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

          <div className="col-6 register-col register-left">
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
          <div className="col-6 register-col register-right">
            <label className="d-block mt-3">Số điện thoại:</label>
            <input
              className="form-control register-input"
              type="text"
              name="soDT"
              {...formik.getFieldProps('soDT')}
            />
            {formik.errors.soDT && formik.touched.soDT && (
              <p className="text-danger">{formik.errors.soDT}</p>
            )}
          </div>
          <div className="col-6 register-col register-left">
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
          <div className="col-6  register-col register-right">
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
              <button className="btn  mt-4 btn-submit d-block mx-auto" type="submit">
          Đăng ký
        </button>
        {errorMessage && <p className="text-danger mt-2 text-center">{errorMessage}</p>}
              </div>
      
      </form>
    );
  }

  export default RegisterFormik;
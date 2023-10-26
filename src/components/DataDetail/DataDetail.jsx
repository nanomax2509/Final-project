import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { getLocalStorage, mergeClassName } from '../../utils/index';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import css from './DataDetail.module.scss';

function DataDetail(props) {
  const { infoDetail, style, className } = props;
  const [isRegistered, setIsRegistered] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('');
  const [notificationText, setNotificationText] = useState('');
  const { userProfile } = useSelector((state) => state.UserReducer);
  const token = getLocalStorage('ACCESS_TOKEN');

  const handleRegister = (event) => {
    event.preventDefault();

    if (isRegistered) {
      setNotificationType('success');
      setNotificationText('Bạn đã đăng ký khoá học này thành công!');
      setShowNotification(true);
    } else {
      axios
        .post(
          'https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/DangKyKhoaHoc',
          {
            maKhoaHoc: infoDetail.maKhoaHoc,
            taiKhoan: userProfile.taiKhoan,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              TokenCybersoft:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MDA4IiwiSGV0SGFuU3RyaW5nIjoiMjgvMDEvMjAyNCIsIkhldEhhblRpbWUiOiIxNzA2NDAwMDAwMDAwIiwibmJmIjoxNjc3NDMwODAwLCJleHAiOjE3MDY1NDc2MDB9.eo3y0MmcjE8Jl4fRzUJLBoZzylEeFDcUTfWXvtb1hdc',
            },
          }
        )
        .then((response) => {
          setNotificationType('success');
          setNotificationText('Bạn đã đăng ký thành công!');
          setIsRegistered(true);
          setShowNotification(true);
        })
        .catch((error) => {
          if (error.response && error.response.data === "Đã đăng ký khóa học này rồi!") {
            setNotificationType('warning');
            setNotificationText(" Đã đăng ký khóa học này rồi!");
          } else {
            setNotificationType('error');
            setNotificationText('Quý khách chưa đăng nhập, vui lòng đăng nhập để đăng ký khoá học!');
            console.error('Lỗi khi đăng ký:', error);
          }

          setShowNotification(true);
          setIsRegistered(false);
        });
    }
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  return (
    <Fragment>
      <div className={css.dataDetailTop}>
        <div className={css.dataDetailLeft}>
          <h1 className={css.title}>{infoDetail.tenKhoaHoc}</h1>
          <h4 className={css.title}>
            Lượt xem khoá học : <span className="text-success">{infoDetail.luotXem}</span>
          </h4>
          {isRegistered ? (
            <button className={css.btnDangKy} disabled>
              ĐĂNG KÝ THÀNH CÔNG
            </button>
          ) : (
            <button className={css.btnDangKy} onClick={handleRegister}>
              ĐĂNG KÝ
            </button>
          )}
        </div>
        <div className={css.dataDetailRight}>
          <img className={css.img} src={infoDetail.hinhAnh} alt="" />
        </div>
      </div>
      <div className={css.dataDetailBottom}>
        <h1 className="text-center mt-3 font-weight-bold">Giới thiệu khoá học</h1>
        <p className="ml-3">{infoDetail.moTa}</p>
      </div>
      {showNotification && (
        <div className={mergeClassName(css.notification, css[notificationType])}>
          <div className={css.notificationContent}>
          <p className='text-center'>{notificationText}</p>
          <button className={css.closeButton} onClick={closeNotification}>
              OK
            </button>
           
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default DataDetail;
import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { mergeClassName } from '../../utils/index';
import { NavLink, useParams } from 'react-router-dom';
import css from './DataDetail.module.scss'
function DataDetail(props) {
  const { infoDetail, style, className } = props;
    console.log("infoDetail",infoDetail.tenKhoaHoc);

  return (
   <Fragment>
    <div className={css.dataDetailTop}>
    <div className={css.dataDetailLeft}>
    <h1 className={css.title}>{infoDetail.tenKhoaHoc}</h1>
    <h4 className={css.title}>Lượt xem khoá học : <span className='text-success'>{infoDetail.luotXem}</span></h4>
    <button className={css.btnDangKy}>ĐĂNG KÝ</button>
    </div>
    <div className={css.dataDetailRight}>
        <img className={css.img} src={infoDetail.hinhAnh} alt="" />
    </div>
    </div>
    <div className={css.dataDetailBottom}>
        <h1 className='text-center mt-3 font-weight-bold'>Giới thiệu khoá học</h1>
        <p className='ml-3'>{infoDetail.moTa}</p>
    </div>
   </Fragment>
  );
}

export default DataDetail;
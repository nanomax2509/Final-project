import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { mergeClassName } from '../../../utils/index';
import { NavLink, useParams } from 'react-router-dom';
import CardCbC from '../../../components/CardCbC/CardCbC'
import css from './ListCbC.module.scss'
function ListCbC(props) {
  const { listCbC, style, className } = props;
    console.log("listcbc",listCbC);
  console.log(listCbC[0]?.maKhoaHoc)
  return (
   <Fragment>
    <h1 className={css.title}>{listCbC[0]?.danhMucKhoaHoc.tenDanhMucKhoaHoc}</h1>
    <h3 className={css.titleMini}>Các khoá học lập trình phổ biến</h3>
    <div className={mergeClassName(css.ListCbc, className)} style={style}>
			<div className="row">
      {Array.isArray(listCbC) &&
				listCbC.map((CbC) => {
					return <CardCbC key={CbC.maKhoaHoc} CbC={CbC}/>;
				})}
      </div>
		</div>
   </Fragment>
  );
}

export default ListCbC;
import React from 'react';
import { NavLink } from 'react-router-dom';

function CardCbC(props) {
  const { CbC } = props;

  return (
    <div className="col-md-3 mb-3">
      <div className="card card-CbC">
        <img src={CbC.hinhAnh} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{CbC.tenKhoaHoc}</h5>
          <p className="card-text">{CbC.luotXem}</p>
          <NavLink to={`/detail/${CbC.maKhoaHoc}`} className="btn btn-primary">
            Đăng ký
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default CardCbC;
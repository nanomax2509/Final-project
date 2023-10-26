import React from 'react';
import { NavLink } from 'react-router-dom';

function CardCbC(props) {
  const { CbC } = props;
  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <div className="col-md-3 mb-3">
      <div className="card card-CbC">
        <img src={CbC.hinhAnh} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{CbC.tenKhoaHoc}</h5>
          <p className="card-text">{CbC.luotXem}</p>
          <NavLink onClick={handleLinkClick} to={`/detail/${CbC.maKhoaHoc}`} className="btn btn-primary">
            Xem ngay
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default CardCbC;
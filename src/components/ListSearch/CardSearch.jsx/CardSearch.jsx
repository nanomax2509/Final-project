import React from "react";
import { NavLink } from "react-router-dom";

function CardSearch(props) {
  const { search } = props;
  return (
    <div className="card-search col-3">
      <div className="card-search-img">
        {/* <img src={search.hinhAnh} alt="..." className="w-100" /> */}
      </div>
      <div className="card-search-content">
        <p className="content-title">{search.tenKhoaHoc}</p>
        <p className="content-sub">{search.luotXem}</p>
      </div>
      <div className="card-search-interact">
        <NavLink
          to={`/detail/${search.maKhoaHoc}`}
          className="card-search-btn buy-now"
        >
          Đăng ký
        </NavLink>
      </div>
    </div>
  );
}

export default CardSearch;
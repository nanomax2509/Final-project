import React from "react";
import { NavLink } from "react-router-dom";
import "./CardSearch.scss";
function Cardsearch(props) {
  const { search } = props;
  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <NavLink to={`/detail/${search.maKhoaHoc}`}  onClick={handleLinkClick} className="card-search">
      <div className="card-search-img">
        <img src={search.hinhAnh} alt="..." className="w-50 " />
      </div>
      <div className="card-search-content">
        <p className="content-title mt-3">{search.tenKhoaHoc}</p>
        <p className="content-title text-muted">{search.moTa}</p>
        <p className="content-sub">Lượt xem: {search.luotXem}</p>
      </div>
    </NavLink>
  );
}

export default Cardsearch;
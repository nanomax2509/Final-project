import React from "react";
import "./CardCourse.scss";
import { NavLink } from "react-router-dom";

function CardCourse(props) {
  const { course } = props;
  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <div className="card-course col-3">
      <div className="card-course-img">
        <img src={course.hinhAnh} alt="..." className="w-100" />
      </div>
      <div className="card-course-content">
        <p className="content-title">{course.tenKhoaHoc}</p>
        <p className="contentSub">Lượt xem: {course.luotXem}</p>
      </div>
      <div className="card-course-interact">
        <NavLink onClick={handleLinkClick}
          to={`/detail/${course.maKhoaHoc}`}
          className="card-course-btn buy-now"
        >
          Xem ngay
        </NavLink>
      </div>
    </div>
  );
}

export default CardCourse;
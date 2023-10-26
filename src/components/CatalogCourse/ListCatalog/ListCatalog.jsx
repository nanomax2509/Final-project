import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { mergeClassName } from '../../../utils/index';
import css from './ListCatalog.module.scss';
import { NavLink } from 'react-router-dom';

function ListCatalog(props) {
  const { listCatalogCourse, style, className } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div
      className={mergeClassName(css.listCatalog, className)}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={css.dropdownWrapper}>
        <div className={css.dropdown}>
          <button
            className={`${css.dropdownTitle} ${isDropdownOpen ? css.falling : ''}`}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            Danh mục
            <i className={`fa ${isDropdownOpen ? 'fa-angle-down' : 'fa-angle-up'} ml-1`} />
          </button>
          {isDropdownOpen && (
            <ul className={css.dropdownList}>
              {Array.isArray(listCatalogCourse) &&
                listCatalogCourse.map((catalog) => {
                  return (
                    <NavLink to={`/CoursesByCategory/${catalog.maDanhMuc}`} className={mergeClassName('d-block text-white  mt-1 w-100', css.catalogLink)} key={catalog.maDanhMuc}>
                      {catalog.tenDanhMuc}
                    </NavLink>
                  );
                })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListCatalog;
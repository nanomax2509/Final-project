import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import logoIcon from '../../../assets/icons/logo.png';
import './HeaderHomeTemplate.scss';
import CatalogCourse from '../../../components/CatalogCourse/catalogCourse';
export default function HeaderHomeTemplate() {
  const { userProfile } = useSelector((state) => state.UserReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <Fragment>
      <header className="HeaderHomeTemplate ">
        <div className="HeaderLeft">
          <NavLink className="HeaderLogo" to="/">
            <img src={logoIcon} alt="" />
            <span>CYBERSOFT</span>
          </NavLink>
          <CatalogCourse />
        </div>

        <div className="HeaderRight">
          <div className="HeaderSearch" to="/search">
            <div className="input-group ">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm khoá học"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <div className="GroupBtnSeach input-group-append">
                <button className="BtnSearch btn btn-outline-secondary" type="button" id="button-addon2">
                <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
          </div>
          {userProfile.email ? (
            <>
              <p style={{ color: 'white' }}>{userProfile.email}</p>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink className={'HeaderLink'} to={'/login'}>
                Login
              </NavLink>
              <NavLink className={'HeaderLink'} to={'/register'}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </header>
    </Fragment>
  );
}
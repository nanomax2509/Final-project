import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import logoIcon from '../../../assets/icons/logo.png';
import './HeaderHomeTemplate.scss';
import CatalogCourse from '../../../components/CatalogCourse/CatalogCourse';
import Search from '../../../pages/Search/Search';

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
          <div className="HeaderSearch" >
              <Search/>
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
      </header>
    </Fragment>
  );
}
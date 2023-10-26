import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import logoIcon from '../../../assets/icons/logo.png';
import './HeaderHomeTemplate.scss';
import CatalogCourse from '../../../components/CatalogCourse/CatalogCourse';
import Search from '../../../pages/Search/Search';
import { deleteKey } from '../../../utils';
import { ACCESS_TOKEN } from '../../../constant';
import { resetUserProfile } from '../../../redux/slices/User';
export default function HeaderHomeTemplate() {
  const { userProfile } = useSelector((state) => state.UserReducer);
  console.log(userProfile,"header")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    deleteKey(ACCESS_TOKEN);
    // reset userLogin ở trên redux.
    const action = resetUserProfile();
    dispatch(action);
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
            <Search />
          </div>
          {userProfile.email ? (
            <div style={{ textAlign: 'center'}} className='d-flex HeaderAccount'>
              <NavLink to={'/profile'} className='mr-3 ' style={{ color: 'white' }}>{userProfile.email}</NavLink>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <NavLink className={'HeaderLink'} to={'/login'}>
                Login
              </NavLink>
              <NavLink className={'HeaderLink'} to={'/register'}>
                Register
              </NavLink>
            </div>
          )}
        </div>

      </header>
    </Fragment>
  );
}
import React, { Fragment } from 'react';
import logoIcon from '../../../assets/icons/cyberlogo-white.png';
import './FooterHomeTemplate.scss'
export default function FooterHomeTemplate() {
  return (
    <Fragment>
      <footer className='FooterHomeTemplate'>
        <div className="row">
          <div className="FooterLeft col-4">
            <div className="FooterLogo">
              <img src={logoIcon} alt="" />
              <p>CyberSoft Academy - Hệ thống đào tạo lập trình chuyên sâu theo dự án</p>
            </div>
          </div>
          <div className="FooterCenter col-4">
            <h3>Đăng ký tư vấn</h3>
            <form>
              <div className="form-group">
                <input type="text" className="form-control" id="inputName" placeholder="Họ và tên *"/>
              </div>
              <div className="form-group">
                <input type="email" className="form-control" id="inputEmail4" placeholder="Email liên hệ *"/>
              </div>
              <div className="form-group">
                <input type="text" className="form-control" id="inputAddress" placeholder="Sđt liên hệ *" />
              </div>
              <div className="form-group">
                <label >Nhấn vào ô bên dưới <span className='text-danger'>*</span></label>
              </div>
              <button type="submit" className="btn btn-primary">Đăng ký tư vấn</button>
            </form>
          </div>
        </div>

      </footer>

    </Fragment>
  )
}

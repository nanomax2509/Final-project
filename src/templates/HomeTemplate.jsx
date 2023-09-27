import React, { Fragment,Suspense} from 'react'
import { NavLink, Outlet } from 'react-router-dom';

import HeaderHomeTemplate from './components/HeaderHomeTemplate/HeaderHomeTemplate';
import FooterHomeTemplate from './components/FooterHomeTemplate/FooterHomeTemplate';
function HomeTemplate() {
  return (
    <Fragment>
        <HeaderHomeTemplate/>
        <div
				style={{
					minHeight: '75vh',
				}}>
				{/* fallback: hiển thị trong lúc đợi component tải xong */}
				<Suspense fallback={<>Loading...</>}>
					<Outlet />
				</Suspense>
			</div>
		<FooterHomeTemplate/>

        </Fragment>

  )
}
export default HomeTemplate;


import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeTemplate from './templates/HomeTemplate'
import { useScrollTop } from './hooks/useScrollTop';
import RegisterFormik from './pages/Register/RegisterFormik';
import Login from './pages/Login/Login';
import CatalogCourse from './components/CatalogCourse/catalogCourse';
import CoursesByCategory from './pages/CoursesbyCategory/Cbc';
import Detail from './pages/Detail/Detail';
const Home = lazy(() => import('./pages/Home/Home'));


function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* element={HomeTemplate} => v5 */}
				<Route path='' element={<HomeTemplate />}>
				<Route index element={<Home />} />
				<Route path='register' element={<RegisterFormik />} />
					<Route path='login' element={<Login />} />
				<Route path='catalogCourse' element={<CatalogCourse/>}/>	
				<Route path='CoursesByCategory/:id' element={<CoursesByCategory/>}/>
				<Route path='Detail/:id' element={<Detail/>}/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

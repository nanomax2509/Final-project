import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeTemplate from './templates/HomeTemplate';

const Home = lazy(() => import('./pages/Home/Home'));
const Register = lazy(() => import('./pages/Register/RegisterFormik'));
const Login = lazy(() => import('./pages/Login/Login'));
const CatalogCourse = lazy(() => import('./components/CatalogCourse/CatalogCourse'));
const CoursesByCategory = lazy(() => import('./pages/CoursesbyCategory/Cbc'));
const Detail = lazy(() => import('./pages/Detail/Detail'));
const ListSearch = lazy(() => import('./components/ListSearch/ListSearch'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const ProfileForm = lazy(() => import('./components/ProfileForm/ProfileForm'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeTemplate />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="catalogCourse" element={<CatalogCourse />} />
          <Route path="CoursesByCategory/:id" element={<CoursesByCategory />} />
          <Route path="Detail/:id" element={<Detail />} />
          <Route path="listSearch" element={<ListSearch />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profileForm" element={<ProfileForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

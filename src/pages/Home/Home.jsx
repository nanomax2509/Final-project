import React, { useEffect } from 'react'
import axios from 'axios';
import CarouselHome from '../../components/Carousel/Carousel'
import ListCourse from '../../components/Course/ListCourse/ListCourse'
import { getThank, setListCourse } from '../../redux/slices/Course';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalStorage } from '../../utils';
import { ACCESS_TOKEN } from '../../constant';
import { getCourseByIdAction } from '../../redux/slices/Course';
import { getCourseByIdThunk } from '../../redux/slices/Course';
import './Home.scss'
import ListCatalog from '../../components/CatalogCourse/ListCatalog/ListCatalog';
const token = getLocalStorage("ACCESS_TOKEN");
function Home() {
	const listCourse = useSelector((state) => state.CourseSlice.listCourse);
	// console.log("listCourse1", listCourse);
	const dispatch = useDispatch();
	const getListCourse = async () => {
		const resp = await axios.get(
			"https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01",
			{
				headers: {
					TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MDA4IiwiSGV0SGFuU3RyaW5nIjoiMjgvMDEvMjAyNCIsIkhldEhhblRpbWUiOiIxNzA2NDAwMDAwMDAwIiwibmJmIjoxNjc3NDMwODAwLCJleHAiOjE3MDY1NDc2MDB9.eo3y0MmcjE8Jl4fRzUJLBoZzylEeFDcUTfWXvtb1hdc',
				},
			}
		);

		// console.log("reps",{ resp });
		// lấy dữ liệu => đưa lên redux
		const action = setListCourse(resp.data.content);
			dispatch(action);
		



	};

	// chỉ chạy một lần, sau khi render xong giao diện.
	useEffect(() => {
		dispatch(getThank());
		// chạy vào useEffect sau khi render giao diện xong.
		// getListCourse();
	}, []);

	const getCourseById = async (id) => {
		// Đẩy lên trên redux;
		const action = getCourseByIdAction(id);
		dispatch(action);
	};

	return (
		<div>
			<CarouselHome />

			<h2 className='Course-feature'>Các khoá học mới nhất</h2>

			<ListCourse className="row listCourse "
				style={{
					marginBottom: '5rem',
				}}
				listCourse={listCourse}
			/>
		</div>
	);
}

export default Home;

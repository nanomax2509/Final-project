import React, { useEffect } from 'react'
import axios from 'axios';
import { getThank, setCatalogCourse } from '../../redux/slices/Catalog';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalStorage } from '../../utils';
import ListCatalog from './ListCatalog/ListCatalog';
const token = getLocalStorage("ACCESS_TOKEN");
function CatalogCourse() {
	const listCatalog = useSelector((state) => state.CatalogSlice.listCatalog);
	// console.log("listCatalog1", listCatalog);
	const dispatch = useDispatch();
	const getCataLogCourse = async () => {
		const resp = await axios.get(
			"https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc",
			{
				headers: {
					TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MDA4IiwiSGV0SGFuU3RyaW5nIjoiMjgvMDEvMjAyNCIsIkhldEhhblRpbWUiOiIxNzA2NDAwMDAwMDAwIiwibmJmIjoxNjc3NDMwODAwLCJleHAiOjE3MDY1NDc2MDB9.eo3y0MmcjE8Jl4fRzUJLBoZzylEeFDcUTfWXvtb1hdc',
				},
			}
		);

		// console.log("reps",{ resp });
		// lấy dữ liệu => đưa lên redux
		const action = setCatalogCourse(resp.data.content);
			dispatch(action);
		



	};

	// chỉ chạy một lần, sau khi render xong giao diện.
	useEffect(() => {
		dispatch(getThank());
		// chạy vào useEffect sau khi render giao diện xong.
		// getListCourse();
	}, []);

	// const getCatalog = async (id) => {
	// 	// Đẩy lên trên redux;
	// 	const action = getCatalogCourseAction(id);
	// 	dispatch(action);
	// };

	return (
		<div className='w-100'>
			<ListCatalog 
				
				listCatalogCourse={listCatalog}
			/>
		</div>
			
	);
}

export default CatalogCourse;

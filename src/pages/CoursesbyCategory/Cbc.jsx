import React, { Fragment, useEffect } from 'react'
import { getThank, setListCbC } from '../../redux/slices/coursesByCategory';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ListCbC from './ListCbC/ListCbC';
import { useParams } from 'react-router-dom';

function CoursesByCategory() {
	const listCbC = useSelector((state) => state.coursesByCategorySlice.listCbc);
	console.log("listCbc", listCbC);
	const dispatch = useDispatch();
	const a = useParams();
	
	console.log(a,"a")  ;

	// };
	// chỉ chạy một lần, sau khi render xong giao diện.
		useEffect(() => {
			dispatch(getThank(a.id));
			// chạy vào useEffect sau khi render giao diện xong.
			// getListCourse();
		}, [a.id]);

	// const getCatalog = async (id) => {
	// 	// Đẩy lên trên redux;
	// 	const action = getCatalogCourseAction(id);
	// 	dispatch(action);
	// };

	return (
		<div className='w-100'>
			<ListCbC
				listCbC={listCbC}
			/>
		</div>

	);

}

export default CoursesByCategory;

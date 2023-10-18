import React, { Fragment, useEffect } from 'react'
import { getThank } from '../../redux/slices/Detail';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DataDetail from '../../components/DataDetail/DataDetail';

function Detail() {
	const infoDetail = useSelector((state) => state.InfoDetailSlice.infoDetail);
	console.log("infoDetail", infoDetail);
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
			<DataDetail
				infoDetail={infoDetail}
			/>
		</div>

	);
}

export default Detail;

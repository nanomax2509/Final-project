import React from 'react';
import { useSelector } from 'react-redux';
import CardCourse from '../../CardCourse/CardCourse';

// import kiểu module.
import css from './ListCourse.module.scss';
import { mergeClassName } from '../../../utils/index';

// SOLID:
// Single-responsibility principle: Đảm nhiệm một nhiệm vụ duy nhất

// nhiệm vụ: render list danh sách sản phẩm
// ( X ): Không có nhiệm vụ show ra UI làm sao hết - vd như margin-bottom.
function ListCourse(props) {

// console.log("listCourse",listCourse);
	const {	listCourse,  style, className } = props;
	return (
		
		<div className={mergeClassName(css.ListCourse, className)} style={style}>
			{Array.isArray(listCourse) &&
				listCourse.map((course) => {
					return <CardCourse key={course.maKhoaHoc} course={course} />;
				})}
		</div>
	);
}

export default ListCourse;

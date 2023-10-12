import React, { Fragment } from 'react'
import ListCourse from './ListCourse/ListCourse'
// http://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom={MaNhom}
// 	{MaNhom}
// 		GP01
// 		GP02
// 		...
export default function Course() {
  return (
    <Fragment>
        <div className="CourseHome">
            <h4>Các khoá học phổ biến</h4>
            <div className="row">
                <ListCourse/>
            </div>
        </div>
    </Fragment>
  )
}

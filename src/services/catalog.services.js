import axios from 'axios';

export const getCatalogCourse = async () => {
	try {
		const resp = await axios.get(
			`https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc`
		);
		return resp; 
	} catch (err) {
		throw new Error(err);
	}
};

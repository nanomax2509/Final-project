import axios from 'axios';
export const getSearchByIdApi = async (id) => {


	try {
		const resp = await axios.get(
			`https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${id}&MaNhom=GP01`
		);
		return resp; 
	} catch (err) {
		throw new Error(err);
	}
};

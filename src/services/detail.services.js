import axios from 'axios';
export const getDetailApi = async (id) => {
	try {
		const resp = await axios.get(
			`https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${id}`
		);
		return resp;
	} catch (err) {

		throw new Error(err);
	}
};

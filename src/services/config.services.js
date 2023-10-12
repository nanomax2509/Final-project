import axios from 'axios';
import { getLocalStorage } from '../utils/index';
import { ACCESS_TOKEN } from '../constant';

const BASE_URL = 'https://elearningnew.cybersoft.edu.vn';
const token = getLocalStorage(ACCESS_TOKEN);
console.log(token)
// Những api nào cần auth cần đăng nhập, private
export const axiosWithAuth = axios.create({
	baseURL: BASE_URL,
	timeout: 180_000, // 3 phút.
});

// nó sẽ chạy cái này trước khi gọi api
axiosWithAuth.interceptors.request.use(
	(config) => {
		// thêm vào header trước khi gọi api
		config.headers = {
			TokenCybersoft: `${token}`,
		};

		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);


import { request } from 'umi';
import { Login, GetList } from '@/types/request';

export const login: Login = ({ username, password }, options = {}) => {
	return request('/login', {
		method: 'post',
		data: {
			username,
			password,
		},
		...options,
	});
};

export const getUserInfo = () => request('/info');

export const downloadFile = (data: string[]) => {
	console.log(data);

	return request('/downloadFile', {
		method: 'post',
		responseType: 'blob',
		requestType: 'form',
		getResponse: true,
		data,
	});
};

export const getList: GetList = params => {
	return request('/getList', {
		method: 'get',
		params,
	});
};

export const postForm = data => {
	return request('/postForm', {
		method: 'post',
		data,
	});
};

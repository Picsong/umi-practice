import { history, RequestConfig, ErrorShowType } from 'umi';
import { message } from 'antd';
import { getToken, clearToken } from '@/helpers/storage';
import { getUserInfo } from '@/services/api';
import { InitState, LoginRequire } from '@/types/index';
import { errorHandler, requestInterceptors, responseInterceptors } from '@/services/config';

const key = 'Initialization';

/**
 * 初始化函数
 */
export async function getInitialState(): Promise<InitState | LoginRequire> {
	if (!getToken()) {
		history.replace('/login');
		return 'LOGIN_REQUIRED';
	}
	message.loading({ content: 'Loading...', key, duration: 0 });

	try {
		let result = await getUserInfo();

		message.success({ content: 'Loaded!', key, duration: 2 });
		if (result.data) {
			return result.data;
		} else {
			return 'LOGIN_REQUIRED';
		}
	} catch (error) {
		message.error({ content: 'Loaded!', key, duration: 2 });
		return 'LOGIN_REQUIRED';
	}
}

/**
 * 布局插件运行时配置
 */
export const layout = {
	logout: () => {
		clearToken();
		history.replace('/login');
	},
};

/**
 * uni-request请求配置
 */
export const request: RequestConfig = {
	timeout: 30000,
	prefix: '/api',
	errorConfig: {
		errorPage: '/error',
	},
	credentials: 'include',
	// errorHandler,
	requestInterceptors: [requestInterceptors],
	responseInterceptors: [responseInterceptors],
};

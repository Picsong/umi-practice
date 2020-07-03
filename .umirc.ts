import { defineConfig } from 'umi';

export default defineConfig({
	nodeModulesTransform: {
		type: 'none',
	},
	antd: {
		dark: true,
	},
	history: {
		type: 'hash',
	},
	locale: false,
	layout: {
		name: 'Picsong',
	},
	cssLoader: {
		localsConvention: 'camelCase', //.bar-foo  --> barFoo 变为驼峰
	},
	dynamicImport: {
		loading: '@/Loading',
	},
	routes: [
		{ path: '/login', component: '@/pages/login/index', layout: false },
		{ path: '/', redirect: '/home' },
		{
			path: '/',
			component: '@/pages/index',
			routes: [
				{ path: '/home', component: '@/pages/home/index' },
				{ path: '/list', component: '@/pages/test-list/index' },
				{ path: '/form', component: '@/pages/test-form/index' },
				{ path: '/error', component: '@/pages/error-page/index' },
			],
		},
		{ path: '/home', name: '首页', icon: 'home', access: 'canReadHome' },
		{ path: '/list', name: '列表', icon: 'user', access: 'canReadList' },
		{ path: '/form', name: '表单', icon: 'form', access: 'canReadForm' },
	],
});

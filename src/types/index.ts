export interface IList {
	current: number; //当前页数
	pageSize: number; //每页显示条数
	total: number; //列表总数
	loading: boolean; //列表loading
}

export interface IAccessState {
	canReadHome: boolean; //首页
	canReadList: boolean; //列表
	[index: string]: boolean;
}

export interface InitState {
	name: string; //用户名
	role: {
		//角色信息
		name: string;
		describe: number;
	};
	auths: Array<string>; //用户拥有的权限信息
}
export type LoginRequire = 'LOGIN_REQUIRED'; //未登录状态

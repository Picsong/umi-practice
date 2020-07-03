import { IList } from '../index';

export interface IListItem {
	id: number;
	name: string;
	age: number;
	gender: string;
	idCard: string;
	phone: string;
	address: string;
}

export interface IState extends IList {
	listData: Array<IListItem>;
	keyword: string;
	sort: string | undefined;
	status: string | undefined;
}

export type ListPayload = {
	listData: Array<IListItem>;
	total: number;
};

export type PagePayload = {
	current: number;
};

export type SizePayload = {
	pageSize: number;
};

export type LoadingPayload = {
	loading: boolean;
};

export type ConditionPayload = {
	keyword: string;
	sort: string | undefined;
	status: string | undefined;
};

export const LIST = 'list'; //更新列表数据
export const CURRENT = 'current'; //更新当前页码
export const PAGESIZE = 'pageSize'; //更新每页显示条数
export const CONDITION = 'condition'; //更新筛选条件
export const LOADING = 'loading'; //更新loading
// type LIST = typeof LIST;
// type CURRENT = typeof CURRENT;
// type PAGESIZE = typeof PAGESIZE;
// type CONDITION = typeof CONDITION;
// type LOADING = typeof LOADING;
// type Pick<T, K extends keyof T> = T[keyof { [P in K]: T[P] }];

interface MapAction {
	[LIST]: ListPayload;
	[CURRENT]: PagePayload;
	[PAGESIZE]: SizePayload;
	[CONDITION]: ConditionPayload;
	[LOADING]: LoadingPayload;
}

type ActionType = keyof MapAction;
type ActionPayload = MapAction[keyof Pick<MapAction, ActionType>];

// type ActionType = LIST | CURRENT | PAGESIZE | CONDITION | LOADING;
// type ActionPayload = ListPayload | PagePayload | SizePayload | ConditionPayload | ListPayload;

export interface IAction {
	type: ActionType;
	payload: ActionPayload;
}

import { useReducer, useCallback } from 'react';
import { message } from 'antd';
import { history } from 'umi';
import { getList, downloadFile } from '@/services/api';
import { downloadFileFn } from '@/helpers/downloadFile';
import {
	IState,
	IAction,
	ListPayload,
	PagePayload,
	SizePayload,
	ConditionPayload,
	LoadingPayload,
	LIST,
	CURRENT,
	PAGESIZE,
	CONDITION,
	LOADING,
} from '../types/test-list';

const initState: IState = {
	loading: false,
	current: 1,
	pageSize: 10,
	keyword: '',
	sort: undefined,
	status: undefined,
	total: 28,
	listData: [],
};

const reducer: (state: IState, action: IAction) => IState = function(state, { type, payload }) {
	switch (type) {
		case LIST: {
			let { listData, total } = payload as ListPayload;
			return { ...state, listData, total };
		}
		case CURRENT: {
			let { current } = payload as PagePayload;
			return { ...state, current };
		}
		case PAGESIZE: {
			let { pageSize } = payload as SizePayload;
			return { ...state, pageSize };
		}
		case CONDITION: {
			let { keyword, sort, status } = payload as ConditionPayload;
			return { ...state, keyword, sort, status };
		}
		case LOADING: {
			let { loading } = payload as LoadingPayload;
			return { ...state, loading };
		}
		default:
			throw new Error();
	}
};

export default function useListModel() {
	const [state, dispatch] = useReducer(reducer, initState);
	/**获取列表数据异步方法 */
	const getListAsync = useCallback(data => {
		dispatch({ type: 'loading', payload: { loading: true } });
		getList(data)
			.then(res => {
				if (res.data) {
					dispatch({
						type: 'list',
						payload: {
							total: res.data.total,
							listData: res.data.listData,
						},
					});
				}
			})
			.catch(e => {
				console.log(e);
			})
			.finally(() => {
				dispatch({ type: 'loading', payload: { loading: false } });
			});
	}, []);
	/**导出下载的方法 */
	const downloadFileAsync = useCallback(ids => {
		downloadFile(ids)
			.then(res => {
				downloadFileFn(res.data);
			})
			.catch(e => {
				console.log(e);
			});
	}, []);
	return {
		state,
		dispatch,
		getListAsync,
		downloadFileAsync,
	};
}

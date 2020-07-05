import { useReducer } from 'react';
import { IState, IAction, IBaseForm, Fields1, Fields2, Fields3, BASEFORM, FIELDS1, FIELDS2, FIELDS3 } from '../types/test-form';
import { postForm } from '@/services/api';
import moment from 'moment';

const initState: IState = {
	base: {
		photo: '',
		cName: '',
		fName: '',
		gender: undefined,
		birthday: '',
		age: '',
		idCard: '',
		nationality: undefined,
		address: undefined,
		country: undefined,
		domain: undefined,
		contacts: '',
		contactNumber: '',
		cGraduateSmd: '',
		fGraduateSmd: '',
		condition1: '否',
		condition2: '否',
		condition3: '否',
		condition4: '否',
		conVal1: '2020/02/12',
		conVal3: '10',
		conVal4: '2020/02/12',
		talentType: undefined,
		selectedTime: '',
		selectedPlace: '',
		SelectedType: undefined,
	},
	fields1: [],
	fields2: [],
	fields3: [],
};

const reducer: (state: IState, action: IAction) => IState = function (state, { type, payload }) {
	switch (type) {
		case BASEFORM: {
			const base = payload as IBaseForm;
			return { ...state, base };
		}
		case FIELDS1: {
			const fields = payload as Fields1;
			return { ...state, fields1: [...state.fields1, fields] };
		}
		case FIELDS2: {
			const fields = payload as Fields2;
			return { ...state, fields2: [...state.fields2, fields] };
		}
		case FIELDS3: {
			const fields = payload as Fields3;
			return { ...state, fields3: [...state.fields3, fields] };
		}
		default:
			throw new Error();
	}
};

export default function useListModel() {
	const [state, dispatch] = useReducer(reducer, initState);
	//格式化基础表单数据去除undefined null ''
	function formatBase(values: IBaseForm) {
		let newBase: any = {};
		for (const key in values) {
			if (values[key]) {
				newBase[key] = values[key];
			}
		}
		return newBase;
	}

	//提交表单事件
	function submitFormAsync(data: IState) {
		console.log(data);
		const base = formatBase(data.base);
		postForm({
			...base,
			fields1: JSON.stringify(data.fields1),
			fields2: JSON.stringify(data.fields2),
			fields3: JSON.stringify(data.fields3),
		})
			.then(res => {
				console.log(res);
			})
			.catch(e => {
				console.log(e);
			});
	}
	function getFormByStep() {}
	return {
		state,
		dispatch,
		submitFormAsync,
		getFormByStep,
	};
}

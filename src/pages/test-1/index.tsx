import React, { useReducer } from 'react';
//尝试从dispatch的type推导payload的类型
interface IState {
	dataA: object;
	dataB: object;
	dataC: object;
}

interface IPayloadA {
	dataA: object;
}

interface IPayloadB {
	dataB: object;
}

interface IPayloadC {
	dataC: object;
}

type IActionType = 'p-1' | 'p-2' | 'p-3';

interface IAction {
	type: IActionType;
	payload: IPayloadA | IPayloadB | IPayloadC;
}

type IDispatch<T extends IActionType> = ({
	type,
	payload,
}: {
	type: T;
	payload: T extends 'p-1' ? IPayloadA : T extends 'p-2' ? IPayloadB : T extends 'p-3' ? IPayloadC : object;
}) => any;

const initialState: IState = { dataA: {}, dataB: {}, dataC: {} };

function reducer(state: IState, action: IAction) {
	switch (action.type) {
		case 'p-1':
			return { ...state };

		case 'p-2':
			return { ...state };

		case 'p-3':
			return { ...state };

		default:
			throw new Error();
	}
}

function Analysis() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<>
			      Count: {JSON.stringify(state)}
			      
			<button
				onClick={() => (dispatch as IDispatch<'p-1'>)({ type: 'p-1', payload: { dataA: { name: 'aaa' } } })}
			>
				        payload-1       
			</button>
			      
			<button onClick={() => (dispatch as IDispatch<'p-2'>)({ type: 'p-2', payload: { dataB: { name: 'bb' } } })}>
				        payload-2       
			</button>
			    
		</>
	);
}

export default Analysis;

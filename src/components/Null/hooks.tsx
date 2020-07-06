import React, { useState } from 'react';

// 模拟实现redux的reducer。官方也提供了useReducer
function useReducer(reducer, initialState) {
	const [state, setState] = useState(initialState);

	function dispatch(action) {
		const nextState = reducer(state, action);
		setState(nextState);
	}

	return [state, dispatch];
}

export default () => {
	const [count, setCount] = useState(0);
	return (
		<div className="padding20">
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>Click me</button>
		</div>
	);
};

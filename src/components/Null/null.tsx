import React from 'react';

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'picsong',
			hasError: false,
		};
		console.log('%c constructor', 'font-size:24px;color:red;');
	}
	static defaultProps = {
		age: 18,
	};
	static getDerivedStateFromProps(props, state) {
		//props  setState force­Update会触发
		console.log('%c getDerivedStateFromProps', 'font-size:24px;color:red;', props, state);
		return null;
	}
	static getDerivedStateFromError(error) {
		// 更新 state 使下一次渲染可以显降级 UI
		console.log('%c getDerivedStateFromError', 'font-size:24px;color:red;', error);
		return { hasError: true };
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log('%c shouldComponentUpdate', 'font-size:24px;color:red;', nextProps, nextState);
		const { name } = this.state;
		if (name === nextState.name) {
			return false;
		}
		return true;
	}
	componentDidMount() {
		console.log('%c componentDidMount', 'font-size:24px;color:red;');
		// window.onbeforeunload = e => {
		// 	e.returnValue = '确定离开当前页面吗？';
		// 	return '确定离开当前页面吗？';
		// };
	}
	getSnapshotBeforeUpdate = (prevProps, prevState) => {
		console.log('%c getSnapshotBeforeUpdate', 'font-size:24px;color:red;', prevProps, prevState);
		return '我会被返回到componentDidUpdate函数的第三个参数';
	};
	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log('%c componentDidUpdate', 'font-size:24px;color:red;', prevProps, prevState, snapshot);
	}
	componentWillUnmount() {
		console.log('%c componentWillUnmount', 'font-size:24px;color:red;');
	}
	componentDidCatch(error, info) {
		console.log('%c componentDidCatch', 'font-size:24px;color:red;', error, info);
	}
	render() {
		console.log('%c render', 'font-size:24px;color:red;');

		const { name, hasError } = this.state;
		return (
			<div
				onClick={e => {
					e.stopPropagation(); //阻止事件传播
					e.preventDefault(); //阻止默认事件
					console.log(e.type);

					this.setState({
						name: 'goomay',
					});
				}}
			>
				{hasError ? '发生错误' : name}
				<p dangerouslySetInnerHTML={{ __html: '<span>First &middot; Second</span>' }}></p>
			</div>
		);
	}
}

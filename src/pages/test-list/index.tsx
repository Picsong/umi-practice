import React, { useEffect, useCallback } from 'react';
import { Table, Button, Tag, Input, Select, Form } from 'antd';
import { history, useModel } from 'umi';

const { Option } = Select;
const { Column } = Table;

export default () => {
	const { state, dispatch, getListAsync, downloadFileAsync } = useModel('useListModel');
	const [form] = Form.useForm();

	//顶部搜索条件变化
	const finishFn = useCallback(values => {
		let { keyword, sort, status } = values;
		dispatch({
			type: 'condition',
			payload: {
				keyword,
				sort,
				status,
			},
		});
	}, []);
	//分页控件
	const pagination = {
		total: state.total,
		current: state.current,
		pageSize: state.pageSize,
		showSizeChanger: true,
		showTotal: (total: number) => `共 ${total} 条数据`,
		onChange: (page: number) => {
			dispatch({ type: 'current', payload: { current: page } });
		},
		onShowSizeChange: (current: number, size: number) => {
			dispatch({ type: 'pageSize', payload: { pageSize: size } });
		},
	};
	useEffect(() => {
		getListAsync({
			current: state.current,
			pageSize: state.pageSize,
			sort: state.sort,
			status: state.status,
			keyword: state.keyword,
		});
	}, [state.current, state.pageSize, state.sort, state.status, state.keyword]);
	return (
		<div className="padding20">
			<Form
				form={form}
				layout="inline"
				onFinish={finishFn}
				initialValues={{ sort: state.sort, status: state.status, keyword: state.keyword }}
			>
				<Form.Item name="sort">
					<Select placeholder="请选择排序" allowClear>
						<Option value="1">按时间排序</Option>
						<Option value="2">按姓名排序</Option>
					</Select>
				</Form.Item>
				<Form.Item name="status">
					<Select placeholder="请选择状态" allowClear>
						<Option value="1">待审核</Option>
						<Option value="2">通过</Option>
						<Option value="3">不通过</Option>
					</Select>
				</Form.Item>
				<Form.Item name="keyword">
					<Input placeholder="请输入关键字" allowClear></Input>
				</Form.Item>
				<Form.Item style={{ marginLeft: 'auto' }}>
					<Button type="primary" htmlType="submit">
						搜索
					</Button>
				</Form.Item>
			</Form>
			<Table
				style={{ marginTop: 20 }}
				dataSource={state.listData}
				loading={{
					spinning: state.loading,
					delay: 333,
					size: 'large',
				}}
				bordered
				rowKey={v => v.id}
				pagination={pagination}
			>
				<Column align="center" title="姓名" dataIndex="name" key="name" />
				<Column align="center" title="性别" dataIndex="gender" key="gender" />
				<Column align="center" title="年龄" dataIndex="age" key="age" />
				<Column align="center" title="身份证" dataIndex="idCard" key="idCard" responsive={['lg']} />
				<Column align="center" title="手机号" dataIndex="phone" key="phone" responsive={['md']} />
				<Column align="center" title="地址" dataIndex="address" key="address" responsive={['lg']} />
			</Table>
			<Button onClick={() => downloadFileAsync(state.listData.map(e => e.id))}>导出</Button>
		</div>
	);
};

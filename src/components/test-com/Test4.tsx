import React, { useState, useEffect, useImperativeHandle } from 'react';
import { Form, Input, Row, Col, Button, Select } from 'antd';
import { Fields4 } from '@/types/test-form';
import './index.less';

const { Option } = Select;

export default React.forwardRef(({ data = [] }: { data: Fields4[] }, ref) => {
	/**页面要用的hooks */
	const [form] = Form.useForm();
	useImperativeHandle(ref, () => ({
		getData: () => form.getFieldsValue(),
	}));
	useEffect(() => {
		form.setFields([{ name: 'fields', value: data }]);
	}, [data]);
	/**自己写的方法 */
	const onFinish = (values: { fields: Fields4[] }) => {
		console.log('Received values of form:', values);
	};
	return (
		<div className="pb50 mb20">
			{/* <div className="ps-title-g">近三年参与的科研项目数量</div> */}
			<div className="ps-border-g xxx">
				<Row>
					<Col span="3">
						<div className="table-th border-none">姓名</div>
					</Col>
					<Col span="3">
						<div className="table-th">性别</div>
					</Col>
					<Col span="3">
						<div className="table-th">年龄</div>
					</Col>
					<Col span="3">
						<div className="table-th">学历</div>
					</Col>
					<Col span="4">
						<div className="table-th">职称</div>
					</Col>
					<Col span="3">
						<div className="table-th">专业</div>
					</Col>
					<Col span="3">
						<div className="table-th">人才级别</div>
					</Col>
					<Col span="2">
						<div className="table-th">操作</div>
					</Col>
				</Row>
				<Form form={form} onFinish={values => onFinish(values as { fields: Fields4[] })} size="large">
					<Form.List name="fields">
						{(fields, { add, remove }) => {
							return (
								<div>
									{fields.map((field, index) => (
										<Row key={field.key} style={{ borderTop: '1px solid #d9d9d9' }}>
											<Col span={3}>
												<Form.Item name={[field.name, 'name']} fieldKey={[field.fieldKey, 'name']}>
													<Input allowClear placeholder="请填写" />
												</Form.Item>
											</Col>
											<Col span={3}>
												<Form.Item name={[field.name, 'gender']} fieldKey={[field.fieldKey, 'gender']}>
													<Select placeholder="请选择">
														<Option value="男">男</Option>
														<Option value="女">女</Option>
													</Select>
												</Form.Item>
											</Col>
											<Col span={3}>
												<Form.Item name={[field.name, 'age']} fieldKey={[field.fieldKey, 'age']}>
													<Input type="number" allowClear placeholder="请填写" />
												</Form.Item>
											</Col>
											<Col span={3}>
												<Form.Item name={[field.name, 'edu']} fieldKey={[field.fieldKey, 'edu']}>
													<Select placeholder="请选择">
														<Option value="本科">本科</Option>
														<Option value="硕士">硕士</Option>
														<Option value="博士">博士</Option>
													</Select>
												</Form.Item>
											</Col>
											<Col span={4}>
												<Form.Item name={[field.name, 'title']} fieldKey={[field.fieldKey, 'title']}>
													<Input allowClear placeholder="请填写" />
												</Form.Item>
											</Col>
											<Col span={3}>
												<Form.Item name={[field.name, 'major']} fieldKey={[field.fieldKey, 'major']}>
													<Input allowClear placeholder="请填写" />
												</Form.Item>
											</Col>
											<Col span={3}>
												<Form.Item name={[field.name, 'level']} fieldKey={[field.fieldKey, 'level']}>
													<Select placeholder="请选择">
														<Option value="国家级">国家级</Option>
														<Option value="省">省</Option>
														<Option value="市">市</Option>
														<Option value="区">区</Option>
													</Select>
												</Form.Item>
											</Col>
											<Col span={2} className="flex-center">
												<Button
													type="link"
													danger
													block
													onClick={() => remove(field.name)}
													style={{ borderLeft: '1px solid #d9d9d9' }}
												>
													删除
												</Button>
											</Col>
										</Row>
									))}
									<Button className="add-btn" block type="dashed" onClick={() => add()}>
										添加一项
									</Button>
								</div>
							);
						}}
					</Form.List>
				</Form>
			</div>
		</div>
	);
});

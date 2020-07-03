import React, { useState, useEffect, useImperativeHandle } from 'react';
import { Form, Input, Select, DatePicker, Row, Col, Button } from 'antd';
import { Fields3 } from '@/types/test-form';
import './index.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

export default React.forwardRef(({ data = [] }: { data: Fields3[] }, ref) => {
	/**页面要用的hooks */
	const [form] = Form.useForm();
	useImperativeHandle(ref, () => ({
		getData: () => form.getFieldsValue(),
	}));
	useEffect(() => {
		form.setFields([{ name: 'fields', value: data }]);
	}, [data]);
	/**自己写的方法 */
	const onFinish = (values: { fields: Fields3[] }) => {
		console.log('Received values of form:', values);
	};
	return (
		<div className="pb50 mb20">
			<div className="ps-title-g">工作经历</div>
			<div className="ps-border-g xxx">
				<Row>
					<Col span="4">
						<div className="table-th border-none">职务/职称</div>
					</Col>
					<Col span="6">
						<div className="table-th">起止时间</div>
					</Col>
					<Col span="4">
						<div className="table-th">国家</div>
					</Col>
					<Col span="8">
						<div className="table-th">单位</div>
					</Col>
					<Col span="2">
						<div className="table-th">操作</div>
					</Col>
				</Row>
				<Form form={form} onFinish={values => onFinish(values as { fields: Fields3[] })} size="large">
					<Form.List name="fields">
						{(fields, { add, remove }) => {
							return (
								<div>
									{fields.map((field, index) => (
										<Row key={field.key} style={{ borderTop: '1px solid #d9d9d9' }}>
											<Col span={4}>
												<Form.Item name={[field.name, 'post']} fieldKey={[field.fieldKey, 'post']}>
													<Input allowClear placeholder="请填写" />
												</Form.Item>
											</Col>
											<Col span={6}>
												<Form.Item name={[field.name, 'time']} fieldKey={[field.fieldKey, 'time']}>
													<RangePicker
														bordered={false}
														style={{ width: '100%' }}
														format="YYYY/MM"
														picker="month"
													></RangePicker>
												</Form.Item>
											</Col>
											<Col span={4}>
												<Form.Item name={[field.name, 'country']} fieldKey={[field.fieldKey, 'country']}>
													<Select placeholder="请选择">
														<Option value="国家">国家</Option>
													</Select>
												</Form.Item>
											</Col>
											<Col span={8}>
												<Form.Item name={[field.name, 'unit']} fieldKey={[field.fieldKey, 'unit']}>
													<Input allowClear placeholder="请填写" />
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

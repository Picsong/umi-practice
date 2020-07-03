import React, { useState, useEffect, useImperativeHandle } from 'react';
import { Form, Input, Select, DatePicker, Row, Col, Button } from 'antd';
import { Fields2 } from '@/types/test-form';
import './index.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

export default React.forwardRef(({ data = [] }: { data: Fields2[] }, ref) => {
	/**页面要用的hooks */
	const [form] = Form.useForm();
	useImperativeHandle(ref, () => ({
		getData: () => form.getFieldsValue(),
	}));
	useEffect(() => {
		form.setFields([{ name: 'fields', value: data }]);
	}, [data]);
	/**自己写的方法 */
	const onFinish = (values: { fields: Fields2[] }) => {
		console.log('Received values of form:', values);
	};
	return (
		<div className="pb50 mb20">
			<div className="ps-title-g">教育经历（从大学开始填起）</div>
			<div className="ps-border-g xxx">
				<Row>
					<Col span="3">
						<div className="table-th border-none">学位</div>
					</Col>
					<Col span="7">
						<div className="table-th">起止时间</div>
					</Col>
					<Col span="3">
						<div className="table-th">国家</div>
					</Col>
					<Col span="5">
						<div className="table-th">院校</div>
					</Col>
					<Col span="4">
						<div className="table-th">专业</div>
					</Col>
					<Col span="2">
						<div className="table-th">操作</div>
					</Col>
				</Row>
				<Form form={form} onFinish={values => onFinish(values as { fields: Fields2[] })} size="large">
					<Form.List name="fields">
						{(fields, { add, remove }) => {
							return (
								<div>
									{fields.map((field, index) => (
										<Row key={field.key} style={{ borderTop: '1px solid #d9d9d9' }}>
											<Col span={3}>
												<Form.Item
													name={[field.name, 'degree']}
													fieldKey={[field.fieldKey, 'degree']}
													className="border-none"
												>
													<Select placeholder="请选择">
														<Option value="学位">学位</Option>
													</Select>
												</Form.Item>
											</Col>
											<Col span={7}>
												<Form.Item name={[field.name, 'time']} fieldKey={[field.fieldKey, 'time']}>
													<RangePicker
														bordered={false}
														style={{ width: '100%' }}
														format="YYYY/MM"
														picker="month"
													></RangePicker>
												</Form.Item>
											</Col>
											<Col span={3}>
												<Form.Item name={[field.name, 'country']} fieldKey={[field.fieldKey, 'country']}>
													<Select placeholder="请选择">
														<Option value="国家">国家</Option>
													</Select>
												</Form.Item>
											</Col>
											<Col span={5}>
												<Form.Item
													name={[field.name, 'university']}
													fieldKey={[field.fieldKey, 'university']}
												>
													<Input placeholder="请填写" allowClear></Input>
												</Form.Item>
											</Col>
											<Col span={4}>
												<Form.Item name={[field.name, 'major']} fieldKey={[field.fieldKey, 'major']}>
													<Input placeholder="请填写" allowClear></Input>
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

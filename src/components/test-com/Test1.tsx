import React, { useState, useEffect, useImperativeHandle } from 'react';
import { Form, Input, Select, DatePicker, Row, Col, Button } from 'antd';
import { Fields1 } from '@/types/test-form';
import './index.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

export default React.forwardRef(({ data = [] }: { data: Fields1[] }, ref) => {
	/**页面要用的hooks */
	const [form] = Form.useForm();
	useImperativeHandle(ref, () => ({
		getData: () => form.getFieldsValue(),
	}));
	useEffect(() => {
		form.setFields([{ name: 'fields', value: data }]);
	}, [data]);
	/**自己写的方法 */
	const onFinish = (values: { fields: Fields1[] }) => {
		console.log('Received values of form:', values);
	};
	return (
		<div className="pb50 mb20">
			<div className="ps-title-g">近三年参与的科研项目数量</div>
			<div className="ps-border-g xxx">
				<Row>
					<Col span="2">
						<div className="table-th border-none">序号</div>
					</Col>
					<Col span="10">
						<div className="table-th">项目名称</div>
					</Col>
					<Col span="8">
						<div className="table-th">项目经费</div>
					</Col>
					<Col span="4">
						<div className="table-th">操作</div>
					</Col>
				</Row>
				<Form form={form} onFinish={values => onFinish(values as { fields: Fields1[] })} size="large">
					<Form.List name="fields">
						{(fields, { add, remove }) => {
							return (
								<div>
									{fields.map((field, index) => (
										<Row key={field.key} style={{ borderTop: '1px solid #d9d9d9' }}>
											<Col span={2} className="flex-center">
												{index + 1}
											</Col>
											<Col span={10}>
												<Form.Item name={[field.name, 'name']} fieldKey={[field.fieldKey, 'name']}>
													<Input allowClear placeholder="请填写" />
												</Form.Item>
											</Col>
											<Col span={8}>
												<Form.Item name={[field.name, 'money']} fieldKey={[field.fieldKey, 'money']}>
													<Input type="number" allowClear placeholder="请填写" />
												</Form.Item>
											</Col>
											<Col span={4} className="flex-center">
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

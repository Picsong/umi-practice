import React, { useEffect, useState, useRef } from 'react';
import { useModel } from 'umi';
import moment from 'moment';
import { Row, Col, Form, Input, Select, Radio, Button, DatePicker, message } from 'antd';
import Test1 from '@/components/test-com/Test1';
import Test2 from '@/components/test-com/Test2';
import Test3 from '@/components/test-com/Test3';
import { IBaseForm, Fields1, Fields2, Fields3 } from '@/types/test-form';

const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';

export default () => {
	const [form] = Form.useForm();
	const [flag1, setFlag1] = useState(false);
	const [flag3, setFlag3] = useState(false);
	const [flag4, setFlag4] = useState(false);
	const [required, setRequired] = useState(true);
	const cRef = useRef<{ getData: Function }>();
	const vRef = useRef<{ getData: Function }>();
	const bRef = useRef<{ getData: Function }>();
	const { state, dispatch, submitFormAsync, getFormByStep } = useModel('useFormModel');

	async function submitForm(type: number) {
		type === 1 ? setRequired(true) : setRequired(false);
		setTimeout(async () => {
			try {
				const base = (await form.validateFields()) as IBaseForm;
				const fields1 = (await cRef.current?.getData()) as { fields: Fields1[] };
				const fields2 = (await vRef.current?.getData()) as { fields: Fields2[] };
				const fields3 = (await bRef.current?.getData()) as { fields: Fields3[] };
				console.log(base, fields1, fields2, fields3);

				if (type === 1) {
					if (fields1.fields?.length === 0) return message.error('参与的科研项目不能为空');
					if (fields2.fields?.length === 0) return message.error('教育经历不能为空');
					if (fields3.fields?.length === 0) return message.error('工作经历不能为空');
					if (fields1.fields?.some(o => Object.values(o).some(e => !e))) return message.warn('参与的科研项目不完整');
					if (fields2.fields?.some(o => Object.values(o).some(e => !e))) return message.warn('教育经历不完整');
					if (fields3.fields?.some(o => Object.values(o).some(e => !e))) return message.warn('工作经历不完整');
				}
				submitFormAsync({
					base: {
						...base,
						birthday: base.birthday && base.birthday.format('YYYY/MM/DD'),
						selectedTime: base.selectedTime && base.selectedTime.format('YYYY/MM/DD'),
						conVal1: base.conVal1 && base.conVal1.format('YYYY/MM/DD'),
					},
					fields1: fields1.fields,
					fields2: fields2.fields,
					fields3: fields3.fields,
				});
			} catch (error) {
				form.scrollToField(error.errorFields[0].name, { block: 'end' });
				message.error('基本信息填写不完整！');
			}
		}, 0);
	}
	useEffect(() => {
		const id = localStorage.getItem('form');
		if (id) {
			getFormByStep();
		}
	}, []);
	useEffect(() => {
		form.setFieldsValue({
			...state.base,
			birthday: state.base.birthday ? moment(state.base.birthday, dateFormat) : '',
			conVal1: state.base.conVal1 ? moment(state.base.conVal1, dateFormat) : '',
			selectedTime: state.base.selectedTime ? moment(state.base.selectedTime, dateFormat) : '',
		});
	}, [state.base]);
	return (
		<div className="padding20">
			<div style={{ width: 1000, margin: '0 auto 50px' }}>
				<div
					style={{
						textAlign: 'center',
						fontWeight: 'bold',
						fontFamily: 'serif',
						fontSize: 24,
						marginBottom: 24,
					}}
				>
					字段很多的表单
				</div>
				<Form form={form} scrollToFirstError={true}>
					<Row>
						<Col span="4">
							<div>123</div>
						</Col>
						<Col span="20">
							<Row gutter={24}>
								<Col span="8">
									<Form.Item name="cName" rules={[{ required, message: '请输入中文名' }]}>
										<Input allowClear placeholder="中文名"></Input>
									</Form.Item>
								</Col>
								<Col span="8">
									<Form.Item name="fName" rules={[{ required, message: '请输入英文名' }]}>
										<Input allowClear placeholder="英文名（无则用拼音）"></Input>
									</Form.Item>
								</Col>
								<Col span="8">
									<Form.Item name="gender" rules={[{ required, message: '请选择性别' }]}>
										<Select allowClear placeholder="性别">
											<Option value="男">男</Option>
											<Option value="女">女</Option>
										</Select>
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={24}>
								<Col span="8">
									<Form.Item name="birthday" rules={[{ required, message: '请选择出生日期' }]}>
										<DatePicker
											style={{ width: '100%' }}
											allowClear
											placeholder="出生年月"
											format={dateFormat}
										></DatePicker>
									</Form.Item>
								</Col>
								<Col span="8">
									<Form.Item name="age" rules={[{ required, message: '请输入年龄' }]}>
										<Input allowClear placeholder="年龄"></Input>
									</Form.Item>
								</Col>
								<Col span="8">
									<Form.Item name="idCard" rules={[{ required, message: '请输入证件号' }]}>
										<Input allowClear placeholder="证件号码"></Input>
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={24}>
								<Col span="8">
									<Form.Item name="nationality" rules={[{ required, message: '请选择国籍' }]}>
										<Select placeholder="国籍">
											<Option value="中国">中国</Option>
										</Select>
									</Form.Item>
								</Col>
								<Col span="8">
									<Form.Item name="address" rules={[{ required, message: '请选择户籍所在地' }]}>
										<Select placeholder="户籍所在地">
											<Option value="中国">中国</Option>
										</Select>
									</Form.Item>
								</Col>
								<Col span="8">
									<Form.Item name="country" rules={[{ required, message: '请选择国家/地区' }]}>
										<Select placeholder="国家/地区">
											<Option value="中国">中国</Option>
										</Select>
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={24}>
								<Col span="8">
									<Form.Item name="domain" rules={[{ required, message: '请选择专业领域' }]}>
										<Select placeholder="专业领域">
											<Option value="中国">中国</Option>
										</Select>
									</Form.Item>
								</Col>
								<Col span="8">
									<Form.Item name="contacts" rules={[{ required, message: '请输入联系人' }]}>
										<Input allowClear placeholder="联系人"></Input>
									</Form.Item>
								</Col>
								<Col span="8">
									<Form.Item name="contactNumber" rules={[{ required, message: '请输入联系电话' }]}>
										<Input allowClear placeholder="联系电话"></Input>
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={24}>
								<Col span="12">
									<Form.Item name="cGraduateSmd" rules={[{ required, message: '请输入' }]}>
										<Input allowClear placeholder="毕业院校、专业及学位（中文）"></Input>
									</Form.Item>
								</Col>
								<Col span="12">
									<Form.Item name="fGraduateSmd" rules={[{ required, message: '请输入' }]}>
										<Input allowClear placeholder="毕业院校、专业及学位（英文）"></Input>
									</Form.Item>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row>
						<Col span="20" className="flex-sb">
							<span>是否具有3年以上研发经验</span>
							<Form.Item name="condition1">
								<Radio.Group onChange={e => setFlag1(e.target.value == '是' ? true : false)}>
									<Radio value="是">是</Radio>
									<Radio value="否">否</Radio>
								</Radio.Group>
							</Form.Item>
						</Col>
						<Col span="4">
							{flag1 && (
								<Form.Item name="conVal1" rules={[{ required, message: '请选择时间' }]}>
									<DatePicker
										style={{ width: '100%' }}
										format={dateFormat}
										allowClear={true}
										placeholder="引进高新区时间"
									></DatePicker>
								</Form.Item>
							)}
						</Col>
					</Row>
					<Row>
						<Col span="20" className="flex-sb">
							<span>申报人及申报项目是否获得高新区创业项目、创客项目、创智项目扶持</span>
							<Form.Item name="condition2">
								<Radio.Group>
									<Radio value="是">是</Radio>
									<Radio value="否">否</Radio>
								</Radio.Group>
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col span="20" className="flex-sb">
							<span>是否在SCI、EI、Nature发表科技论文，且作为前三名发表人</span>
							<Form.Item name="condition3">
								<Radio.Group onChange={e => setFlag3(e.target.value == '是' ? true : false)}>
									<Radio value="是">是</Radio>
									<Radio value="否">否</Radio>
								</Radio.Group>
							</Form.Item>
						</Col>
						<Col span="4">
							{flag3 && (
								<Form.Item name="conVal3" rules={[{ required, message: '请输入篇数' }]}>
									<Input type="number" allowClear placeholder="篇数"></Input>
								</Form.Item>
							)}
						</Col>
					</Row>
					<Row>
						<Col span="20" className="flex-sb">
							<span>是否在企业全职创新</span>
							<Form.Item name="condition4">
								<Radio.Group onChange={e => setFlag4(e.target.value == '是' ? true : false)}>
									<Radio value="是">是</Radio>
									<Radio value="否">否</Radio>
								</Radio.Group>
							</Form.Item>
						</Col>
						<Col span="4">
							{flag4 && (
								<Form.Item name="conVal4" rules={[{ required, message: '请输入职称' }]}>
									<Input allowClear placeholder="职称"></Input>
								</Form.Item>
							)}
						</Col>
					</Row>
					<Row gutter={24}>
						<Col span="8">
							<Form.Item name="talentType" rules={[{ required, message: '请选择人才类别' }]}>
								<Select placeholder="高新区人才认定类别" allowClear>
									<Option value="A类">A类</Option>
									<Option value="B类">B类</Option>
									<Option value="C类">C类</Option>
								</Select>
							</Form.Item>
						</Col>
						<Col span="8">
							<Form.Item name="selectedTime" rules={[{ required, message: '请选择入选时间' }]}>
								<DatePicker
									style={{ width: '100%' }}
									allowClear
									placeholder="入选时间"
									format={dateFormat}
								></DatePicker>
							</Form.Item>
						</Col>
						<Col span="8">
							<Form.Item name="selectedPlace" rules={[{ required, message: '请输入选地点' }]}>
								<Input allowClear placeholder="入选地点"></Input>
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col span="24">
							<Form.Item name="SelectedType" rules={[{ required, message: '请选择入选类型' }]}>
								<Select placeholder="入选类型" allowClear>
									<Option value="1">呵呵呵呵</Option>
									<Option value="2">哈哈哈哈</Option>
								</Select>
							</Form.Item>
						</Col>
					</Row>
				</Form>
				<Test1 data={state.fields1} ref={cRef}></Test1>
				<Test2 data={state.fields2} ref={vRef}></Test2>
				<Test3 data={state.fields3} ref={bRef}></Test3>
				<div className="flex-center">
					<Button>返回</Button>
					<Button onClick={() => submitForm(1)} type="primary" style={{ margin: '20px', width: '200px' }}>
						下一步
					</Button>
					{/* <Button onClick={() => submitForm(2)}>保存</Button> */}
				</div>
			</div>
		</div>
	);
};

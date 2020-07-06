import React, { useEffect, useState, useRef } from 'react';
import { useModel } from 'umi';
import moment from 'moment';
import { Row, Col, Form, Input, Select, Radio, Button, DatePicker, message } from 'antd';
import Test4 from '@/components/test-com/Test4';

const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';

export default () => {
	const [form] = Form.useForm();
	const [otherField, setOtherField] = useState(false); //是否其他领域
	const [cooperation, setCooperation] = useState(false); //有无国际合作
	const [financing, setFinancing] = useState(false); //有无融资合作
	const testRef = useRef<{ getData: Function }>(); //传递到子组件Test4的ref
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
					字段很多的表单2
				</div>
				<div className="ps-title-g">申请项目信息表</div>
				<Form form={form} scrollToFirstError={true}>
					<Row gutter={24}>
						<Col span="12">
							<Form.Item name="cName" rules={[{ required: true, message: '请输入项目名称' }]}>
								<Input allowClear placeholder="项目名称"></Input>
							</Form.Item>
						</Col>
						<Col span={otherField ? 6 : 12}>
							<Form.Item name="gender" rules={[{ required: true, message: '请选择产业领域' }]}>
								<Select allowClear placeholder="产业领域" onChange={value => setOtherField(value === '其他')}>
									<Option value="电子信息">电子信息</Option>
									<Option value="生物医药">生物医药</Option>
									<Option value="航空航天">航空航天</Option>
									<Option value="重大装备制造">重大装备制造</Option>
									<Option value="新经济">新经济</Option>
									<Option value="其他">其他</Option>
								</Select>
							</Form.Item>
						</Col>
						{otherField && (
							<Col span="6">
								<Form.Item name="otherField" rules={[{ required: true, message: '请输入产业领域' }]}>
									<Input allowClear placeholder="其他领域"></Input>
								</Form.Item>
							</Col>
						)}
					</Row>
					<div className="ps-block-g">
						<span className="title">现有知识产权状况</span>
						<Row gutter={24}>
							<Col span="8">
								<Form.Item name="num1" rules={[{ required: true, message: '请输入PCT授权（数量）' }]}>
									<Input allowClear type="number" placeholder="PCT授权（数量）"></Input>
								</Form.Item>
							</Col>
							<Col span="8">
								<Form.Item name="num2" rules={[{ required: true, message: '请输入国家新药（数量）' }]}>
									<Input allowClear type="number" placeholder="国家新药（数量）"></Input>
								</Form.Item>
							</Col>
							<Col span="8">
								<Form.Item name="num3" rules={[{ required: true, message: '请输入国家一级中药保护品（数量）' }]}>
									<Input allowClear type="number" placeholder="国家一级中药保护品（数量）"></Input>
								</Form.Item>
							</Col>
							<Col span="8">
								<Form.Item name="num4" rules={[{ required: true, message: '请输入发明专利（数量）' }]}>
									<Input allowClear type="number" placeholder="发明专利（数量）"></Input>
								</Form.Item>
							</Col>
							<Col span="8">
								<Form.Item name="num5" rules={[{ required: true, message: '请输入国防专利（数量）' }]}>
									<Input allowClear type="number" placeholder="国防专利（数量）"></Input>
								</Form.Item>
							</Col>
							<Col span="8">
								<Form.Item
									name="num6"
									rules={[{ required: true, message: '请输入实用新型发明专利授权（数量）' }]}
								>
									<Input allowClear type="number" placeholder="实用新型发明专利授权（数量）"></Input>
								</Form.Item>
							</Col>
							<Col span="8">
								<Form.Item
									name="num7"
									rules={[{ required: true, message: '请输入计算机软件著作权登记（数量）' }]}
								>
									<Input allowClear type="number" placeholder="计算机软件著作权登记（数量）"></Input>
								</Form.Item>
							</Col>
							<Col span="8">
								<Form.Item
									name="num8"
									rules={[{ required: true, message: '请输入集成电路版图设计登记（数量）' }]}
								>
									<Input allowClear type="number" placeholder="集成电路版图设计登记（数量）"></Input>
								</Form.Item>
							</Col>
							<Col span="8">
								<Form.Item name="num9" rules={[{ required: true, message: '请输入其他及需要说明的事项' }]}>
									<Input allowClear type="number" placeholder="其他及需要说明的事项"></Input>
								</Form.Item>
							</Col>
						</Row>
					</div>
					<div className="ps-block-g">
						<span className="title">国际合作</span>
						<div className="flex-sb" style={{ alignItems: 'baseline' }}>
							<span>有无国际合作背景（注：若是，请提交相关证明。）</span>
							<Form.Item name="cooperation">
								<Radio.Group onChange={e => setCooperation(e.target.value == '有' ? true : false)}>
									<Radio value="有">有</Radio>
									<Radio value="无">无</Radio>
								</Radio.Group>
							</Form.Item>
						</div>
						{cooperation && (
							<>
								<Form.Item name="otherField" rules={[{ required: true, message: '请输入合作方名称' }]}>
									<Input allowClear placeholder="合作方名称"></Input>
								</Form.Item>
								<Form.Item name="otherField" rules={[{ required: true, message: '请输入合作方概况简述' }]}>
									<Input allowClear placeholder="合作方概况简述"></Input>
								</Form.Item>
							</>
						)}
					</div>
					<div className="ps-block-g">
						<span className="title">融资及合作</span>
						<div className="flex-sb" style={{ alignItems: 'baseline' }}>
							<span>是否需要融资及合作</span>
							<Form.Item name="cooperation">
								<Radio.Group onChange={e => setFinancing(e.target.value == '是' ? true : false)}>
									<Radio value="是">是</Radio>
									<Radio value="否">否</Radio>
								</Radio.Group>
							</Form.Item>
						</div>
						{financing && (
							<Row gutter={24}>
								<Col span="12">
									<Form.Item
										name="otherField"
										rules={[{ required: true, message: '请输入融资方式、合作方式' }]}
									>
										<Input allowClear placeholder="融资方式、合作方式"></Input>
									</Form.Item>
								</Col>
								<Col span="12">
									<Form.Item name="otherField" rules={[{ required: true, message: '请输入融资金额（万元）' }]}>
										<Input allowClear type="number" placeholder="融资金额（万元）"></Input>
									</Form.Item>
								</Col>
							</Row>
						)}
					</div>
					<div className="mt20">
						<Form.Item name="content1" rules={[{ required: true, message: '请输入' }]}>
							<Input.TextArea
								placeholder="研究开发的目的、意义"
								autoSize={{ minRows: 3, maxRows: 6 }}
								maxLength={1000}
							></Input.TextArea>
						</Form.Item>
						<Form.Item name="content2" rules={[{ required: true, message: '请输入' }]}>
							<Input.TextArea
								placeholder="关键技术内容、技术特点和创新点"
								autoSize={{ minRows: 3, maxRows: 6 }}
								maxLength={1000}
							></Input.TextArea>
						</Form.Item>
						<Form.Item name="content3" rules={[{ required: true, message: '请输入' }]}>
							<Input.TextArea
								placeholder="国内外相关行业现状、发展趋势、市场需求"
								autoSize={{ minRows: 3, maxRows: 6 }}
								maxLength={1000}
							></Input.TextArea>
						</Form.Item>
						<Form.Item name="content4" rules={[{ required: true, message: '请输入' }]}>
							<Input.TextArea
								placeholder="研究方法、技术路线（工艺、流程）"
								autoSize={{ minRows: 3, maxRows: 6 }}
								maxLength={1000}
							></Input.TextArea>
						</Form.Item>
						<Form.Item name="content4" rules={[{ required: true, message: '请输入' }]}>
							<Input.TextArea
								placeholder="已具备的研究开发条件"
								autoSize={{ minRows: 3, maxRows: 6 }}
								maxLength={1000}
							></Input.TextArea>
						</Form.Item>
					</div>
					<div className="mt20">
						<div className="ps-title-g">项目人员情况</div>
						<Row gutter={24}>
							<Col span="6">
								<Form.Item name="otherField" rules={[{ required: true, message: '请输入项目组总人数' }]}>
									<Input allowClear type="number" placeholder="项目组总人数"></Input>
								</Form.Item>
							</Col>
							<Col span="6">
								<Form.Item name="otherField" rules={[{ required: true, message: '请输入高级职称' }]}>
									<Input allowClear type="number" placeholder="高级职称"></Input>
								</Form.Item>
							</Col>
							<Col span="6">
								<Form.Item name="otherField" rules={[{ required: true, message: '请输入中级职称' }]}>
									<Input allowClear type="number" placeholder="中级职称"></Input>
								</Form.Item>
							</Col>
							<Col span="6">
								<Form.Item name="otherField" rules={[{ required: true, message: '请输入初级职称' }]}>
									<Input allowClear type="number" placeholder="初级职称"></Input>
								</Form.Item>
							</Col>
						</Row>
					</div>
				</Form>
				<Test4 data={[]} ref={testRef}></Test4>
				<div className="flex-center">
					<Button>返回</Button>
					<Button
						type="primary"
						style={{ margin: '20px', width: '200px' }}
						onClick={() => {
							console.log(testRef.current?.getData());
						}}
					>
						下一步
					</Button>
				</div>
			</div>
		</div>
	);
};

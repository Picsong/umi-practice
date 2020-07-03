import React, { useCallback } from 'react';
import { Form, Button, Input, message } from 'antd';
import { history, useRequest } from 'umi';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { setToken } from '@/helpers/storage';
import { login } from '@/services/api';
import './index.less';

export default () => {
	const [form] = Form.useForm();
	const { loading, run } = useRequest(login, {
		manual: true,
		onSuccess: res => {
			console.log(res);
			message.success('登录成功！');
			setToken(res.token);
			location.href = '/home';
		},
		onError: err => {
			console.log(err);
		},
	});
	const finishFn = useCallback(values => {
		run(values);
	}, []);
	return (
		<div className="login-wrap">
			<div className="content">
				<h1>Picsong管理系统</h1>
				<Form size="large" className="form-wrap" form={form} onFinish={finishFn}>
					<Form.Item name="username" rules={[{ required: true, message: '请输入帐号！' }]}>
						<Input
							prefix={<UserOutlined className="site-form-item-icon" />}
							allowClear
							placeholder="帐号"
						></Input>
					</Form.Item>
					<Form.Item name="password" rules={[{ required: true, message: '请输入密码！' }]}>
						<Input.Password
							prefix={<LockOutlined className="site-form-item-icon" />}
							placeholder="密码"
							allowClear
							type="password"
						></Input.Password>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" block loading={loading}>
							登录
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

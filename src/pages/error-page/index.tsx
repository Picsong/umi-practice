import React from 'react';
import { Result, Button, Typography } from 'antd';
import { history, useLocation, Link } from 'umi';
import { CloseCircleOutlined } from '@ant-design/icons';

const { Paragraph, Text } = Typography;

export default () => {
	const query = useLocation().query;

	return (
		<Result
			status="error"
			title={query.errorMessage}
			subTitle={'错误码：' + query.errorCode}
			extra={[
				<Button type="primary" key="console" onClick={history.goBack}>
					返回
				</Button>,
				<Button key="buy" onClick={() => history.replace('/home')}>
					首页
				</Button>,
			]}
		>
			<div className="desc">
				<Paragraph>
					<Text
						strong
						style={{
							fontSize: 16,
						}}
					>
						错误详情（原因）:
					</Text>
				</Paragraph>
				<Paragraph>
					<CloseCircleOutlined style={{ color: 'red' }} />
					一、当前还未进行登录
					<Link to="/login" replace>
						{' '}
						去登录 &gt;
					</Link>
				</Paragraph>
				<Paragraph>
					<CloseCircleOutlined style={{ color: 'red' }} />
					二、据上次登录时间已超时
					<Link to="/login" replace>
						{' '}
						重新登录 &gt;
					</Link>
				</Paragraph>
			</div>
		</Result>
	);
};

import React, { useState } from 'react';
import { ConfigProvider } from 'antd';
import { useAccess } from 'umi';
import zhCN from 'antd/es/locale/zh_CN';
import enUS from 'antd/es/locale/en_US';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('en');
type size = 'large' | 'middle' | 'large';
const initSize: size = 'large';

export default props => {
	const [size, setSize] = useState(initSize);
	const [lang, setLang] = useState(zhCN);

	return (
		<ConfigProvider locale={lang} componentSize={size}>
			{props.children}
		</ConfigProvider>
	);
};

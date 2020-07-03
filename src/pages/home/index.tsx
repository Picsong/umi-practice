import React, { useRef, useState } from 'react';
import { Line, Pie } from '@ant-design/charts';

const Page: React.FC = () => {
	const [data, setData] = useState([
		{ year: '1991', value: 3 },
		{ year: '1992', value: 4 },
		{ year: '1993', value: 3.5 },
		{ year: '1994', value: 5 },
		{ year: '1995', value: 4.9 },
		{ year: '1996', value: 6 },
		{ year: '1997', value: 7 },
		{ year: '1998', value: 9 },
		{ year: '1999', value: 13 },
	]);
	const config = {
		data,
		title: {
			visible: true,
			text: '带数据点的折线图',
		},
		xField: 'year',
		yField: 'value',
		point: {
			visible: true,
			size: 5,
			shape: 'diamond',
			style: {
				fill: 'white',
				stroke: '#2593fc',
				lineWidth: 2,
			},
		},
		events: {
			onPlotClick: cfg => {
				console.log(cfg);
			},
		},
	};
	const data1 = [
		{
			type: '分类一',
			value: 27,
		},
		{
			type: '分类二',
			value: 25,
		},
		{
			type: '分类三',
			value: 18,
		},
		{
			type: '分类四',
			value: 15,
		},
		{
			type: '分类五',
			value: 10,
		},
		{
			type: '其它',
			value: 5,
		},
	];
	const config1 = {
		forceFit: true,
		title: {
			visible: true,
			text: '多色饼图',
		},
		description: {
			visible: true,
			text:
				'指定颜色映射字段(colorField)\uFF0C饼图切片将根据该字段数据显示为不同的颜色\u3002指定颜色需要将color配置为一个数组\u3002\n当把饼图label的类型设置为inner时\uFF0C标签会显示在切片内部\u3002设置offset控制标签的偏移值\u3002',
		},
		radius: 0.8,
		data: data1,
		angleField: 'value',
		colorField: 'type',
		label: {
			visible: true,
			type: 'inner',
		},
	};
	const ref = useRef();
	// 导出图片
	const downloadImage = () => {
		ref.current?.downloadImage();
	};
	// 获取图表 base64 数据
	const toDataURL = () => {
		console.log(ref.current?.toDataURL());
	};
	const updateData = () => {
		setData([
			{ year: '1991', value: 1 },
			{ year: '1992', value: 2 },
			{ year: '1993', value: 3.5 },
			{ year: '1994', value: 4 },
			{ year: '1995', value: 5.9 },
			{ year: '1996', value: 6 },
			{ year: '1997', value: 7 },
			{ year: '1998', value: 8 },
			{ year: '1999', value: 13 },
		]);
	};
	return (
		<div className="padding20">
			<button type="button" onClick={downloadImage} style={{ marginRight: 24 }}>
				导出图片
			</button>
			<button type="button" onClick={toDataURL}>
				获取图表信息
			</button>
			<button type="button" onClick={updateData}>
				更新数据
			</button>
			<Line {...config} chartRef={ref} />
			<Pie {...config1} />
		</div>
	);
};
export default Page;

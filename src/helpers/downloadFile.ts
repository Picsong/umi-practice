export function downloadFileFn(blob: Blob) {
	//核心使用a标签下载，兼容所有浏览器
	let a = document.createElement('a');
	document.body.appendChild(a);
	a.setAttribute('style', 'display: none');
	let url = window.URL.createObjectURL(blob);
	a.href = url;
	a.download = '测试人员成绩汇总表';
	a.click();
	a.remove();
	window.URL.revokeObjectURL(url);
}

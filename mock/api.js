import mockjs from 'mockjs';
//
mockjs.Random.extend({
	phone() {
		let phonePrefixs = ['131', '134', '151', '177', '182', '191']; // 自己写前缀哈
		return this.pick(phonePrefixs) + mockjs.mock(/\d{8}/); //Number()
	},
});
export default {
	'POST /api/login': (req, res) => {
		const { username, password } = req.body;
		if (username === 'picsong' && password === '123456') {
			res.send({
				success: true,
				data: {
					token: 'aaaaa.bbbbbb.ccccc',
				},
			});
		} else {
			// res.sendStatus(400);
			res.send({
				success: false,
				errorCode: 777,
				errorMessage: '帐号或密码错误',
				showType: 2,
			});
		}
	},

	'GET /api/info': (req, res) => {
		let token = req.headers['token'];
		if (token) {
			res.send({
				success: true,
				data: {
					name: 'picsong',
					role: {
						name: '管理员',
						describe: 0,
					},
					auths: ['canReadHome', 'canReadList'],
				},
			});
		} else {
			res.send({
				success: false,
				errorCode: 888,
				errorMessage: '未登录或登录过期',
				showType: 2,
			});
		}
	},

	'GET /api/getList': (req, res) => {
		setTimeout(() => {
			res.send({
				success: true,
				data: mockjs.mock({
					total: 30,
					'listData|10': [
						{
							'id|+1': 1,
							name: '@cname',
							'age|18-30': 25,
							'gender|1': ['男', '女'],
							idCard: '@ID',
							address: '@city',
							phone: ['@phone'],
						},
					],
				}),
			});
		}, 1000);
	},

	'POST /api/downloadFile': (req, res) => {
		res.send({
			success: true,
			data: [],
		});
	},

	'POST /api/postForm': (req, res) => {
		console.log(req.body);

		res.send({
			success: true,
			data: {
				id: 11,
			},
		});
	},
};

const env = process.env.NODE_ENV; //值为 development 或 production
export const url = env === 'development' ? '' : 'http://gx.chengdutalent.cn';

import { InitState, IAccessState, LoginRequire } from './types/index';

export default function(initialState: InitState | LoginRequire): IAccessState {
	const final: IAccessState = {
		canReadHome: false,
		canReadList: false,
	};
	if (typeof initialState === 'string') return final;

	const { auths } = initialState;

	for (const key in final) {
		if (auths.includes(key)) {
			final[key] = true;
		}
	}
	return final;
}

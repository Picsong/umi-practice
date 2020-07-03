export interface IBaseForm {
	photo: string;
	cName: string;
	fName: string;
	gender: string | undefined;
	birthday: string;
	age: string;
	idCard: string;
	nationality: string | undefined;
	address: string | undefined;
	country: string | undefined;
	domain: string | undefined;
	contacts: string;
	contactNumber: string;
	cGraduateSmd: string;
	fGraduateSmd: string;
	condition1: string;
	condition2: string;
	condition3: string;
	condition4: string;
	conVal1: string;
	conVal3: string;
	conVal4: string;
	talentType: string | undefined;
	selectedTime: string;
	selectedPlace: string;
	SelectedType: string | undefined;
	[key: string]: any;
}

export type Fields1 = {
	name: string;
	money: number;
};
export type Fields2 = {
	time: string;
	degree: string;
	country: string;
	university: string;
	major: string;
};
export type Fields3 = {
	time: string;
	post: string;
	country: string;
	unit: string;
};

export interface IState {
	base: IBaseForm;
	fields1: Fields1[];
	fields2: Fields2[];
	fields3: Fields3[];
}

export const BASEFORM = 'baseform';
export const FIELDS1 = 'fields1';
export const FIELDS2 = 'fields2';
export const FIELDS3 = 'fields3';

interface MapAction {
	[BASEFORM]: IBaseForm;
	[FIELDS1]: Fields1;
	[FIELDS2]: Fields2;
	[FIELDS3]: Fields3;
}

type ActionType = keyof MapAction;
type ActionPayload = MapAction[keyof Pick<MapAction, ActionType>];

export interface IAction {
	type: ActionType;
	payload: ActionPayload;
}

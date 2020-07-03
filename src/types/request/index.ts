import { ListPayload } from '@/types/test-list';

export type Login = ({ username, password }: { username: string; password: string }, options?: object) => void;
export type GetList = ({
	current,
	pageSize,
	keyword,
	sort,
	status,
}: {
	current: number;
	pageSize?: number;
	keyword?: string;
	sort?: string;
	status?: string;
}) => Promise<{ data: ListPayload }>;

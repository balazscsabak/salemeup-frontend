import { useSession } from 'next-auth/react';

export default function useUser() {
	const { data, status } = useSession();
	const isAuthenticated = status === 'authenticated' ? true : false;

	return {
		isAuthenticated,
	};
}

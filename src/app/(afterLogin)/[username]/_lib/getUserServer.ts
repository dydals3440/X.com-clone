import { QueryFunction } from '@tanstack/react-query';
import { User } from '@/model/User';
import { cookies } from 'next/headers';

export const getUserServer: QueryFunction<
	User,
	[_1: string, _2: string]
> = async ({ queryKey }) => {
	const [_1, username] = queryKey;
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`,
		{
			next: {
				tags: ['users', username],
			},
			// getUser는 서버에서 실행할 떄, 페이지에서 프리페치 쿼리시 할 떄 서버에서 실행
			credentials: 'include',
			cache: 'no-store',
			headers: {
				// 서버에서 쓰일 떄는 쿠키를 못가져옴.
				Cookie: cookies().toString(),
			},
		},
	);
	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data');
	}

	return res.json();
};

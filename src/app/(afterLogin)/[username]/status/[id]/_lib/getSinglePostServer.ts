import { cookies } from 'next/headers';

export const getSinglePostServer = async ({
	queryKey,
}: {
	queryKey: [string, string];
}) => {
	const [_1, id] = queryKey;
	const res = await fetch(`http://localhost:9090/api/posts/${id}`, {
		next: {
			tags: ['posts', id],
		},
		credentials: 'include',
		headers: { Cookie: cookies().toString() },
		// 캐시 안하게 설정
		cache: 'no-store',
	});
	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data');
	}

	return res.json();
};

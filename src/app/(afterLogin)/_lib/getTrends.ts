export async function getTrends() {
	const res = await fetch(`http://localhost:9090/api/hashtags/trends`, {
		next: {
			tags: ['trends'],
		},
		cache: 'no-store',
		// 무엇인가 정보를 내가 로그인 했다는 것을 알아야 할 경우, credentials: 'include' 설정
		credentials: 'include',
	});

	if (!res.ok) {
		throw new Error('Failed to fetch Data');
	}

	return res.json();
}

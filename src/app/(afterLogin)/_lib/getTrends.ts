export async function getTrends() {
	const res = await fetch(`http://localhost:9090/api/hashtags/trends`, {
		next: {
			tags: ['trends'],
		},
		cache: 'no-store',
		credentials: 'include',
	});

	if (!res.ok) {
		throw new Error('Failed to fetch Data');
	}

	return res.json();
}

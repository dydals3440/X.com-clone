import { revalidatePath } from 'next/cache';

export async function getPostRecommends({ pageParam }: { pageParam?: number }) {
	const res = await fetch(
		`http://localhost:9090/api/postRecommends?cursor=${pageParam}`,
		{
			// next에서는 tag를 지원
			// 서버 컴포넌트라, 이 함수가 서버에서 실행.
			// 서버에서는 받아온 데이터를 자동으로 저장함(기본적).
			next: {
				tags: ['posts', 'recommends'],
			},
			// 캐싱을 안할려면, no-store 옵션 적용!
			// 캐싱을 지나치게하면, 새로운 데이터를 안불러오게 됨.
			// 업데이트 쳐주는 키가 위에 next { tags: [키] }
			cache: 'no-store',
		},
	);

	if (!res.ok) {
		throw new Error('Failed to fetch Data');
	}

	// revalidateTag('recommends') 이런식으로 키를 날려줄 수 있음.
	// revalidatePath('/home') 홈폴더에 관련된 모든 요청들을 새로고침함.
	// 이 페이지 전체의 데이터를 새로고침 함.
	revalidatePath('/home');

	return res.json();
}

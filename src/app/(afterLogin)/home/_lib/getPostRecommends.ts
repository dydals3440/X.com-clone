import { revalidatePath } from 'next/cache';

type Props = {
	pageParam?: number;
};

export async function getPostRecommends({ pageParam }: Props) {
	const res = await fetch(
		`http://localhost:9090/api/postRecommends?cursor=${pageParam}`,
		{
			next: {
				tags: ['posts', 'recommends'],
			},
		},
	);

	if (!res.ok) {
		throw new Error('Failed to fetch Data');
	}

	// revalidateTag('recommends') 이런식으로 키를 날려줄 수 있음.
	// revalidatePath('/home') 홈폴더에 관련된 모든 요청들을 새로고침함.
	// 이 페이지 전체의 데이터를 새로고침 함.
	// revalidatePath('/home');

	return res.json();
}

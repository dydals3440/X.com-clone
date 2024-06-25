import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from '@tanstack/react-query';
import Post from '../_component/Post';
import PostForm from './_component/PostForm';
import Tab from './_component/Tab';
import TabProvider from './_component/TabProvider';
import style from './page.module.css';
import { revalidatePath } from 'next/cache';

async function getPostRecommends() {
	const res = await fetch(`http://localhost:9090/api/postRecommends`, {
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
	});

	if (!res.ok) {
		throw new Error('Failed to fetch Data');
	}

	// revalidateTag('recommends') 이런식으로 키를 날려줄 수 있음.
	// revalidatePath('/home') 홈폴더에 관련된 모든 요청들을 새로고침함.
	// 이 페이지 전체의 데이터를 새로고침 함.
	revalidatePath('/home');

	return res.json();
}

export default async function Home() {
	const queryClient = new QueryClient();
	// 데이터 불러오기
	await queryClient.prefetchQuery({
		queryKey: ['posts', 'recommends'],
		queryFn: getPostRecommends,
	});
	// 데이터 불러오면 dehydrated
	// dehydratedState를 react-query가 hydrate를 해야함.
	// hydrate라는 것은 서버에서 온 데이터를 클라이언트에서 형식 맞춰 물려받는 것.
	const dehydratedState = dehydrate(queryClient);

	return (
		<main className={style.main}>
			<HydrationBoundary state={dehydratedState}>
				<TabProvider>
					<Tab />
					<PostForm />
					<Post />
					<Post />
					<Post />
					<Post />
					<Post />
				</TabProvider>
			</HydrationBoundary>
		</main>
	);
}

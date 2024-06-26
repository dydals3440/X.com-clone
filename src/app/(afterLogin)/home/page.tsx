import {
	DehydratedState,
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from '@tanstack/react-query';

import PostForm from './_component/PostForm';
import Tab from './_component/Tab';
import TabProvider from './_component/TabProvider';
import style from './page.module.css';

import PostRecommends from './_component/PostRecommends';
import { getPostRecommends } from './_lib/getPostRecommends';
import TabDecider from './_component/TabDecider';

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
	const dehydratedState: DehydratedState = dehydrate(queryClient);

	return (
		<main className={style.main}>
			<HydrationBoundary state={dehydratedState}>
				<TabProvider>
					<Tab />
					<PostForm />
					<TabDecider />
					<PostRecommends />
				</TabProvider>
			</HydrationBoundary>
		</main>
	);
}

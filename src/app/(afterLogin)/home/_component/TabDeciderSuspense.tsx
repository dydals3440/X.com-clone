import TabDecider from './TabDecider';
import {
	DehydratedState,
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from '@tanstack/react-query';
import { getPostRecommends } from '../_lib/getPostRecommends';

export default async function TabDeciderSuspense() {
	const queryClient = new QueryClient();
	// 데이터 불러오기
	await queryClient.prefetchInfiniteQuery({
		queryKey: ['posts', 'recommends'],
		queryFn: getPostRecommends,
		initialPageParam: 0,
	});
	// 데이터 불러오면 dehydrated
	// dehydratedState를 react-query가 hydrate를 해야함.
	// hydrate라는 것은 서버에서 온 데이터를 클라이언트에서 형식 맞춰 물려받는 것.
	const dehydratedState: DehydratedState = dehydrate(queryClient);
	return (
		<HydrationBoundary state={dehydratedState}>
			<TabDecider />
		</HydrationBoundary>
	);
}

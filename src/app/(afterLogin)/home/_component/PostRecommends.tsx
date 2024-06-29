'use client';

import {
	InfiniteData,
	useInfiniteQuery,
	useQuery,
} from '@tanstack/react-query';
import { getPostRecommends } from '../_lib/getPostRecommends';
import Post from '@/app/(afterLogin)/_component/Post';
import { Post as IPost } from '@/model/Post';
import { Fragment } from 'react';

export default function PostRecommends() {
	// RQ Provider내부에서는 query 사용가능
	const { data } = useInfiniteQuery<
		IPost[],
		Object,
		InfiniteData<IPost[]>,
		[_1: string, _2: string],
		number
	>({
		queryKey: ['posts', 'recommends'],
		queryFn: getPostRecommends,
		// 1분동안은 항상 Fresh한 상태
		initialPageParam: 0,
		getNextPageParam: lastPage => lastPage.at(-1)?.postId,
		staleTime: 60 * 1000,
		// inactive 보는 화면에서, postRecommends를 안쓴다, 그러면 inActive가 된다.
		// inactive 상태일 떄 gcTime이 돌아감, 5분 뒤에는 캐시에서 매번 데이터를 불러옴
		// 5분이 지나면 캐시가 날라가기에 새로 불러와야함.
		// Stale Time < GcTime (s:5분, gc:3분 5분동안에는 같은 캐시데이터를 새로 불러오지 않고 재사용 하기 위함)
		// inactive시 gc타임이 돔, inactive일떄는 3분뒤에 캐시가 사라짐
		// staleTime을 5분으로 해놓은, 이유가 퇴색됨.
		gcTime: 300 * 1000,
		// 초기데이터가 있고 초기데이터로 되돌릴 수 있을 떄 reset을 사용
		// initialData: () => [],
	});

	return data?.pages.map((page, idx) => (
		<Fragment key={idx}>
			{page.map(post => (
				<Post key={post.postId} post={post} />
			))}
		</Fragment>
	));
}

// refetch는 무조건 데이터를 다시 가져옴
// invalidate는 inactive일 떄는 안가져오고, 지금 현재 화면에서 데이터를 쓰고 있을 떄만
// 가져오는 것. 무조건 invalidate를 쓰면 되지않냐 생각
// refetch 쓸 수 있음. 화면에 안보여도 그 데이터가 필요할 수 있음.
// 다른 컴포넌트에서 전역적으로 공유하는애들은, 필요로함 refetch가.

// reset의 조건 initialData

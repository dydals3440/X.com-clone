'use client';

import { useQuery } from '@tanstack/react-query';
import { getPostRecommends } from '../_lib/getPostRecommends';
import Post from '@/app/(afterLogin)/_component/Post';
import { Post as IPost } from '@/model/Post';

export default function PostRecommends() {
	// RQ Provider내부에서는 query 사용가능
	const { data } = useQuery<IPost[]>({
		queryKey: ['posts', 'recommends'],
		queryFn: getPostRecommends,
		// 1분동안은 항상 Fresh한 상태
		staleTime: 60 * 1000,
		// inactive 보는 화면에서, postRecommends를 안쓴다, 그러면 inActive가 된다.
		// inactive 상태일 떄 gcTime이 돌아감, 5분 뒤에는 캐시에서 매번 데이터를 불러옴
		// 5분이 지나면 캐시가 날라가기에 새로 불러와야함.
		// Stale Time < GcTime (s:5분, gc:3분 5분동안에는 같은 캐시데이터를 새로 불러오지 않고 재사용 하기 위함)
		// inactive시 gc타임이 돔, inactive일떄는 3분뒤에 캐시가 사라짐
		// staleTime을 5분으로 해놓은, 이유가 퇴색됨.
		gcTime: 30 * 1000,
	});

	return data?.map(post => <Post key={post.postId} post={post} />);
}

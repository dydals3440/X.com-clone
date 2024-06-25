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
	});

	return data?.map(post => <Post key={post.postId} post={post} />);
}

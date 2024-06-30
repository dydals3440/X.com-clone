'use client';

import { useQuery } from '@tanstack/react-query';

import Post from '@/app/(afterLogin)/_component/Post';
import { Post as IPost } from '@/model/Post';
import { getFollowingPosts } from '../_lib/getFollowingPosts';
import Loading from '../loading';

export default function FollowingPosts() {
	const { data, isPending } = useQuery<IPost[]>({
		queryKey: ['posts', 'followings'],
		queryFn: getFollowingPosts,
		staleTime: 60 * 1000,
		gcTime: 300 * 1000,
	});

	if (isPending) {
		return <Loading />;
	}

	return data?.map(post => <Post key={post.postId} post={post} />);
}

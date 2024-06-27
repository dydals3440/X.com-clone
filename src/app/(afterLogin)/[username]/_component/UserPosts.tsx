'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserPosts } from '../_lib/getUserPosts';
import Post from '@/app/(afterLogin)/_component/Post';
import { Post as IPost } from '@/model/Post';

type Props = {
	username: string;
};

export default function UserPosts({ username }: Props) {
	// Object는 객체가 아닌 모든 값임 (모든값이 다 된다는거), 객체는 object임.
	const { data } = useQuery<
		IPost[],
		Object,
		IPost[],
		[_1: string, _2: string, _3: string]
	>({
		queryKey: ['posts', 'users', username],
		queryFn: getUserPosts,
		staleTime: 60 * 1000,
		gcTime: 300 * 1000,
	});
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData(['users', username]);
	console.log('user', user);

	if (user) {
		return data?.map(post => <Post key={post.postId} post={post} />);
	}
}

'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import Post from '@/app/(afterLogin)/_component/Post';
import { Post as IPost } from '@/model/Post';
import { getSinglePost } from '../_lib/getSinglePost';

type Props = {
	id: string;
};

export default function SinglePost({ id }: Props) {
	// Object는 객체가 아닌 모든 값임 (모든값이 다 된다는거), 객체는 object임.
	const { data: post } = useQuery<
		IPost,
		Object,
		IPost,
		[_1: string, _2: string]
	>({
		queryKey: ['posts', id],
		queryFn: getSinglePost,
		staleTime: 60 * 1000,
		gcTime: 300 * 1000,
	});

	console.log(post, 'hi');

	if (!post) {
		return (
			<div
				style={{
					height: 100,
					alignItems: 'center',
					fontSize: 31,
					fontWeight: 'bold',
					justifyContent: 'center',
					display: 'flex',
				}}
			>
				게시글을 찾을 수 없습니다.
			</div>
		);
	}
	return <Post key={post.postId} post={post} />;
}

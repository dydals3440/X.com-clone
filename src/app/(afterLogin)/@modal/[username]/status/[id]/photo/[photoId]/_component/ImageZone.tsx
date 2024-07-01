'use client';

import { useQuery } from '@tanstack/react-query';
import { Post as IPost } from '@/model/Post';
import { getSinglePost } from '@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost';
import style from '../photoModal.module.css';
import ActionButtons from '@/app/(afterLogin)/_component/ActionButton';

type Props = {
	id: string;
};

function ImageZone({ id }: Props) {
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

	if (!post?.Images[0]) {
		return null;
	}

	return (
		<div className={style.imageZone}>
			<img src={post.Images[0].link} alt={post.content} />
			<div
				className={style.image}
				style={{ backgroundImage: `url(${post.Images[0].link})` }}
			/>
			<div className={style.buttonZone}>
				<div className={style.buttonInner}>
					<ActionButtons white post={post} />
				</div>
			</div>
		</div>
	);
}

export default ImageZone;

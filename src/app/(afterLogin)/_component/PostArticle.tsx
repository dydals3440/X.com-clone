'use client';

import { useRouter } from 'next/navigation';
import style from './post.module.css';

import { ReactNode } from 'react';
import { Post } from '@/model/Post';

type Props = {
	children: ReactNode;
	post: Post;
};

export default function PostArticle({ children, post }: Props) {
	const router = useRouter();
	let target = post;
	if (post.Original) {
		target = post.Original;
	}

	const onClick = () => {
		router.push(`/${post.User.id}/status/${target.postId}`);
	};

	return (
		// onClickCapture를 통해 이벤트 캡처링 가능, 이밴트 캡처링시,
		<article onClick={onClick} className={style.post}>
			{children}
		</article>
	);
}

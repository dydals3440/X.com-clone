'use client';

import { useRouter } from 'next/navigation';
import style from './post.module.css';

import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
	post: {
		postId: number;
		content: string;
		User: {
			id: string;
			nickname: string;
			image: string;
		};
		createdAt: Date;
		Images: any[];
	};
};

export default function PostArticle({ children, post }: Props) {
	const router = useRouter();

	const onClick = () => {
		router.push(`/${post.User.id}/status/${post.postId}`);
	};

	return (
		// onClickCapture를 통해 이벤트 캡처링 가능, 이밴트 캡처링시,
		<article onClick={onClick} className={style.post}>
			{children}
		</article>
	);
}

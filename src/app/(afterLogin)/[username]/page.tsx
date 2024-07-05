import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from '@tanstack/react-query';

import style from './profile.module.css';

import UserPosts from './_component/UserPosts';
import { getUserPosts } from './_lib/getUserPosts';

import UserInfo from './_component/UserInfo';
import { auth } from '@/auth';
import { getUserServer } from './_lib/getUserServer';
import { User } from '@/model/User';

export async function generateMetadata({ params }: Props) {
	const user: User = await getUserServer({
		queryKey: ['users', params.username],
	});
	return {
		title: `${user.nickname} (${user.id})`,
		description: `${user.nickname} (${user.id})`,
	};
}

type Props = {
	params: { username: string };
};

export default async function Profile({ params }: Props) {
	const { username } = params;
	const queryClient = new QueryClient();
	const session = await auth();
	// 사용자 정보 쿼리로 가져옴
	await queryClient.prefetchQuery({
		queryKey: ['users', username],
		queryFn: getUserServer,
	});
	// 해당 유저의 게시글
	await queryClient.prefetchQuery({
		queryKey: ['posts', 'users', username],
		queryFn: getUserPosts,
	});
	const dehydratedState = dehydrate(queryClient);
	// 서버쪽에서 쿼리를 해온 것을 나중에 dehydratedState로 받으면 됨.

	// const user = {
	// 	id: 'zerohch0',
	// 	nickname: '제로초',
	// 	image: '/5Udwvqim.jpg',
	// };

	return (
		<main className={style.main}>
			<HydrationBoundary state={dehydratedState}>
				<UserInfo username={username} session={session} />
				<div>
					<UserPosts username={username} />
				</div>
			</HydrationBoundary>
		</main>
	);
}

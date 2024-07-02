'use client';

import { User } from '@/model/User';
import style from './followRecommend.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import cx from 'classnames';
import Link from 'next/link';
import { MouseEventHandler } from 'react';

type Props = {
	user: User;
};

export default function FollowRecommend({ user }: Props) {
	const { data: session } = useSession();

	const followed = !!user.Followers?.find(v => v.id === session?.user?.email);
	const queryClient = useQueryClient();

	const follow = useMutation({
		mutationFn: (userId: string) => {
			return fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`,
				{
					credentials: 'include',
					method: 'post',
				},
			);
		},
		onMutate: (userId: string) => {
			const value: User[] | undefined = queryClient.getQueryData([
				'users',
				'followRecommends',
			]);
			if (value) {
				const index = value.findIndex(v => v.id === userId);
				console.log(value, userId, index);
				const shallow = [...value];
				console.log(shallow, '셸로우');
				shallow[index] = {
					// 유저 정보 얕게 복사
					...shallow[index],
					// 유저 정보 추가
					Followers: [{ id: session?.user?.email as string }],
					_count: {
						...shallow[index]._count,
						Followers: shallow[index]._count?.Followers + 1,
					},
				};
				queryClient.setQueryData(['users', 'followRecommends'], shallow);
			}
			const value2: User | undefined = queryClient.getQueryData([
				'users',
				userId,
			]);

			if (value2) {
				const shallow = {
					...value2,
					Followers: [{ id: session?.user?.email as string }],
					_count: {
						...value2._count,
						Followers: value2._count?.Followers + 1,
					},
				};
				queryClient.setQueryData(['users', userId], shallow);
			}
		},
		onError: () => {},
	});
	const unfollow = useMutation({
		mutationFn: (userId: string) => {
			return fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`,
				{
					credentials: 'include',
					method: 'delete',
				},
			);
		},
		// mutationFn에 넘긴 파라미터가 전달됨
		onMutate: (userId: string) => {
			const value: User[] | undefined = queryClient.getQueryData([
				'users',
				'followRecommends',
			]);
			if (value) {
				const index = value.findIndex(v => v.id === userId);
				const shallow = [...value];
				console.log(
					'shallow',
					shallow[index].Followers.filter(v => v.id),
				);
				console.log(value, userId, index);
				shallow[index] = {
					// 유저 정보 얕게 복사
					...shallow[index],
					Followers: shallow[index].Followers.filter(
						v => v.id !== session?.user?.email,
					),
					_count: {
						...shallow[index]._count,
						Followers: shallow[index]._count?.Followers - 1,
					},
				};
				queryClient.setQueryData(['users', 'followRecommends'], shallow);
				const value2: User | undefined = queryClient.getQueryData([
					'users',
					userId,
				]);
				if (value2) {
					const shallow = {
						...value2,
						Followers: value2.Followers.filter(
							v => v.id !== session?.user?.email,
						),
						_count: {
							...value2._count,
							Followers: value2._count?.Followers - 1,
						},
					};
					queryClient.setQueryData(['users', userId], shallow);
				}
			}
		},
		onError: () => {},
	});

	const onFollow: MouseEventHandler<HTMLButtonElement> = e => {
		e.stopPropagation();
		e.preventDefault();
		if (followed) {
			unfollow.mutate(user.id);
		} else {
			follow.mutate(user.id);
		}
	};

	return (
		<Link href={`/${user.id}`} className={style.container}>
			<div className={style.userLogoSection}>
				<div className={style.userLogo}>
					<img src={user?.image} alt={user?.id} />
				</div>
			</div>
			<div className={style.userInfo}>
				<div className={style.title}>{user?.nickname}</div>
				<div className={style.count}>@{user?.id}</div>
			</div>
			<div
				className={cx(style.followButtonSection, followed && style.followed)}
			>
				<button onClick={onFollow}>{followed ? '팔로잉' : '팔로우'}</button>
			</div>
		</Link>
	);
}

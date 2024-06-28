'use client';

import BackButton from '../../_component/BackButton';
import style from '@/app/(afterLogin)/[username]/profile.module.css';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/model/User';
import { getUser } from '../_lib/getUser';

type Props = {
	username: string;
};

export default function UserInfo({ username }: Props) {
	const {
		data: user,
		error,
		isLoading,
	} = useQuery<User, Object, User, [_1: string, _2: string]>({
		queryKey: ['users', username],
		queryFn: getUser,
		staleTime: 60 * 1000,
		gcTime: 300 * 1000,
	});

	console.dir(error);

	if (error) {
		return (
			<>
				<div className={style.header}>
					<BackButton />
					<h3 className={style.headerTitle}>프로필</h3>
				</div>
				<div className={style.userZone}>
					<div className={style.userImage}></div>
					<div className={style.userName}>
						<div>@{username}</div>
					</div>
				</div>
				<div className={style.noUserContainer}>계정이 존재하지 않음</div>
			</>
		);
	}

	if (isLoading) {
	}

	// 로딩 되기 전까지는  possibly undefined type error 방지
	if (!user) {
		return null;
	}

	return (
		<>
			<div className={style.header}>
				<BackButton />
				<h3 className={style.headerTitle}>{user.nickname}</h3>
			</div>
			<div className={style.userZone}>
				<div className={style.userImage}>
					<img src={user.image} alt={user.id} />
				</div>
				<div className={style.userName}>
					<div>{user.nickname}</div>
					<div>@{user.id}</div>
				</div>
				<button className={style.followButton}>팔로우</button>
			</div>
		</>
	);
}

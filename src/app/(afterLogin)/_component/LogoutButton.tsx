'use client';

import { signOut } from 'next-auth/react';
import style from './logoutButton.module.css';

import { Session } from '@auth/core/types';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type Props = {
	me: Session | null;
};

export default function LogoutButton({ me }: Props) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const onLogout = () => {
		// 로그아웃했을떄, 다 날려버려야, 마이페이지 접근 되는 것을 막음.
		queryClient.invalidateQueries({
			queryKey: ['posts'],
		});
		queryClient.invalidateQueries({
			queryKey: ['users'],
		});
		signOut({ callbackUrl: '/' }).then(() => {
			// clean cookie
			fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
				method: 'post',
				credentials: 'include',
			});
			// 라우터 캐시 초기화
			router.refresh();
			router.replace('/');
		});
	};

	if (!me?.user) {
		return null;
	}

	return (
		<button className={style.logOutButton} onClick={onLogout}>
			<div className={style.logOutUserImage}>
				<img src={me.user?.image as string} alt={me.user?.email as string} />
			</div>
			<div className={style.logOutUserName}>
				<div>{me.user?.name}</div>
				<div>@{me.user?.email}</div>
			</div>
		</button>
	);
}

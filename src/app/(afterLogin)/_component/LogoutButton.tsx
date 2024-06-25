'use client';

import { signOut, useSession } from 'next-auth/react';
import style from './logoutButton.module.css';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
	const router = useRouter();
	const { data: me } = useSession();
	console.log('me', me);
	// const me = {
	// 	// 임시로 내 정보 있는것처럼
	// 	id: 'zerohch0',
	// 	nickname: '제로초',
	// 	image: '/5Udwvqim.jpg',
	// };

	if (!me?.user) {
		return null;
	}

	const onLogout = () => {
		// 서버쪽 리다이렉트는 꺼줌.
		signOut({ redirect: false });
		router.replace('/');
	};

	return (
		<button className={style.logOutButton} onClick={onLogout}>
			<div className={style.logOutUserImage}>
				{/* !붙이면 꼭 있다는 의미 as string 해줘도 무방 */}
				<img src={me.user?.image!} alt={me.user?.email as string} />
			</div>
			<div className={style.logOutUserName}>
				<div>{me.user?.name}</div>
				<div>@{me.user?.email}</div>
			</div>
		</button>
	);
}

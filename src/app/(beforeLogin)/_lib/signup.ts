'use server';

import { redirect } from 'next/navigation';

// 서버 코드는 클라이언트상에 노출이 안되므로 비밀키 써도 무방.
// 브라우저 -> 서버 -> 데이터베이스 접근. (클라 코드 접근 방식.)
// 서버 -> 브라우저 (한단계가 줄어듬.)

export default async (prevState: any, formData: FormData) => {
	if (!formData.get('id') || !(formData.get('id') as string)?.trim()) {
		return { message: 'no_id' };
	}
	if (!formData.get('name') || !(formData.get('name') as string)?.trim()) {
		return { message: 'no_name' };
	}
	if (
		!formData.get('password') ||
		!(formData.get('password') as string)?.trim()
	) {
		return { message: 'no_password' };
	}
	if (!formData.get('image')) {
		return { message: 'no_image' };
	}
	let shouldRedirect = false;

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
			{
				method: 'post',
				body: formData,
				// 이게 있어야 쿠키가 전달 됨.
				// 이미 로그인 한 사람이 또 회원가입하는건 웃김. 이미 로그인 한 상태라서 회원가입 못하게
				// 쿠키 유무로 판별 가능.
				credentials: 'include',
			},
		);
		console.log(response.status);
		if (response.status === 403) {
			return { message: 'user-exists' };
		}
		console.log(await response.json());
		shouldRedirect = true;
	} catch (err) {
		console.error(err);
		return;
	}
	if (shouldRedirect) {
		// try catch 문에서 절대 사용 X
		redirect('/home');
		// return undefined;
	}
};

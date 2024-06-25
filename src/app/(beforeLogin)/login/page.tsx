'use client';

import { useRouter } from 'next/navigation';
import Main from '../_component/Main';
import { useSession } from 'next-auth/react';

// login => i/flow/login으로 넘어가게 하고 싶은데, 서버쪽이기 떄문에 클라이언트에서
// 동작 X
// import { redirect } from 'next/navigation';

// export default function Login() {
// 	redirect('/i/flow/login');
// }

export default function Login() {
	const router = useRouter();
	const { data: session } = useSession();

	if (session?.user) {
		router.replace('/home');
		return null;
	}
	router.replace('/i/flow/login');
	// /login 페이지로 가면, 빈 화면이 나올 꺼임.
	// 배경화면을 만들어줘야함.
	return <Main />;
}

// router.push
// localhost:3001/login -> localhost:3001/i/flow/login
// 뒤로 가기시 login으로 감

// router.replace
// localhost:3001/login -> localhost:3001/i/flow/login
// replace는 뒤로가기하면 login 이전 꺼 히스토리가 안남음.

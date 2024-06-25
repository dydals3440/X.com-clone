// auth -> middleware로 이름을 변경함.
import { NextResponse } from 'next/server';

// export function middleware가 된거임.
// auth가 middleware역할을 대신함.
// auth 함수 호출하면, 내가 로그인했는지, 안했는지 알아낼 수 있음.
import { auth } from './auth';

export async function middleware() {
	const session = await auth();
	if (!session) {
		return NextResponse.redirect('http://localhost:3000/i/flow/login');
	}
}

// See "Matching Paths" below to learn more
export const config = {
	// 로그인을 해야지만 접근할 수 있는 곳.
	matcher: ['/compose/tweet', '/home', '/explore', '/messages', '/search'],
};

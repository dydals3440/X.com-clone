import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';
import cookie from 'cookie';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
} = NextAuth({
	pages: {
		signIn: '/i/flow/login',
		newUser: '/i/flow/signup',
	},
	callbacks: {
		jwt({ token }) {
			console.log('auth.ts jwt', token);
			return token;
		},
		session({ session, newSession, user }) {
			console.log('auth.ts session', session, newSession, user);
			return session;
		},
	},
	events: {
		signOut(data) {
			console.log(
				'auth.ts events signout',
				'session' in data && data.session,
				'token' in data && data.token,
			);
			fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
				method: 'POST',
				credentials: 'include',
			});
			// if ('session' in data) {
			//   data.session = null;
			// }
			// if ('token' in data) {
			//   data.token = null;
			// }
		},
		session(data) {
			console.log(
				'auth.ts events session',
				'session' in data && data.session,
				'token' in data && data.token,
			);
		},
	},
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				const authResponse = await fetch(
					`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							id: credentials.username,
							password: credentials.password,
						}),
					},
				);
				// 프론트서버에서 백엔드 서버의 로그인 토큰을 받아옴.
				// 서버에서 받아온 쿠키는 문자열, 그냥 쓰면 문제가 있음.
				// next.js에서 cookie를 설정할 수 있다.
				let setCookie = authResponse.headers.get('Set-Cookie');
				console.log('set-cookie', setCookie);
				//
				if (setCookie) {
					const parsed = cookie.parse(setCookie);
					// next.js에서 쿠키를 설정할 수 있다.
					// 그리고 객체로 만든 곳에서, 값 꺼내고, 나머지 옵션들, http 설정, secure설정, Age설정들이
					// parsed에 담김
					// 프론트 서버에 쿠키를 심으면 안됨, 서버이기 떄문에 공용임 (여러 브라우저가, 프론트 서버를 바라봄)
					// 프론트 서버에 로그인 쿠키를 심으면, 개인정보 유출 문제가 발생 (조심해야함)
					// 항상 브라우저에 심어야함.

					// 프론트 서버에 요청을 보낼떄는 authjs.session-token 활용
					// 백엔드 서버에 요청을 보낼떄는 connect.sid를 사용.
					cookies().set('connect.sid', parsed['connect.sid'], parsed); // 브라우저에 쿠키를 심어주는 것
				}
				console.log(authResponse.ok, 'hoihihihihih');
				if (!authResponse.ok) {
					return null;
				}

				const user = await authResponse.json();

				return {
					email: user.id,
					name: user.nickname,
					image: user.image,
					...user,
				};
			},
		}),
	],
});

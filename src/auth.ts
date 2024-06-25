import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextResponse } from 'next/server';

export const {
	handlers: { GET, POST },
	// middleware에 import로 연결
	auth,
	signIn,
} = NextAuth({
	pages: {
		signIn: '/i/flow/login',
		newUser: '/i/flow/signup',
	},
	// callbacks라는 프로퍼티에서, 세션유무에 따른 처리를 할 수 있음
	// 미들웨어에서 처리하는 방법이 더 좋음.
	// callbacks: {
	// 	async authorized({ request, auth }) {
	// 		if (!auth) {
	// 			return NextResponse.redirect(`http://localhost:3000/i/flow/login`);
	// 		}
	// 		return true;
	// 	},
	// },
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

				if (!authResponse.ok) {
					return null;
				}

				const user = await authResponse.json();
				console.log(user);
				// nickname => next의 UserType에 맞춰서 바꿔준 모습
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

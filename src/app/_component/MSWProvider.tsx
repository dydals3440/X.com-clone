'use client';

import { useEffect } from 'react';

export const MSWProvider = () => {
	useEffect(() => {
		// window가 undefined가 아니라는 것은, 윈도우가 존재한다는 것, 윈도우가 존재할 떄는
		// 클라이어늩 환경 브라우저 환경이라는 의미
		if (typeof window !== 'undefined') {
			if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
				// 클라이언트 환경에서는 이 파일이 이제 요청을 가로챔.
				// http 서버로 보내버림.
				// 그 안에 작성했던 아래 부분이 실행.
				require('@/mocks/browser');
			}
		}
	}, []);

	return null;
};

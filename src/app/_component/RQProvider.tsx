'use client';

import React, { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type Props = {
	children: React.ReactNode;
};

export function RQProvider({ children }: Props) {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				// react-query 전역 설정
				queries: {
					// stale된 데이터는 아래 3가지의 경우에 다시 가져옴.
					// 다른 탭 갔다가 z.com으로 돌아올떄 탭전환시
					refetchOnWindowFocus: false,
					// 컴포넌트가 unmount됐다가, 다시 mount 됐을 경우
					// 페이지를 이동했던지, 컴포넌트가 스테이트때문에 언마운트 됐다가, 다시 마운트 되는경우
					retryOnMount: true,
					// 인터넷 연결이 끊겼다가 다시 접속이 되는 경우
					refetchOnReconnect: false,
					// 데이터를 가져올떄 몇번정도 재시도 할 수 있는 옵션.
					retry: false,
				},
			},
		}),
	);

	return (
		<QueryClientProvider client={client}>
			{children}
			<ReactQueryDevtools
				initialIsOpen={process.env.NEXT_PUBLIC_NODE === 'local'}
			/>
		</QueryClientProvider>
	);
}

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
					refetchOnWindowFocus: false,
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

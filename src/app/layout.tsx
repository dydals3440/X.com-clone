import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import { MSWProvider } from './_component/MSWProvider';
import AuthSessionProvider from './_component/AuthSessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

type Props = {
	children: React.ReactNode;
};
export default function RootLayout({ children }: Props) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<MSWProvider />
				{/* next auth */}
				<AuthSessionProvider>
					<div>{children}</div>
				</AuthSessionProvider>
			</body>
		</html>
	);
}

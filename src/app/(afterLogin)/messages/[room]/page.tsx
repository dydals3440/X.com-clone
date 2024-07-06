import style from './chatRoom.module.css';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import MessageForm from '@/app/(afterLogin)/messages/[room]/_component/MessageForm';
import { getUserServer } from '@/app/(afterLogin)/[username]/_lib/getUserServer';
import { auth } from '@/auth';
import { QueryClient } from '@tanstack/react-query';

import React from 'react';
import WebSocketComponent from '@/app/_component/WebSocketProvider';
import { UserInfo } from '@/app/(afterLogin)/messages/[room]/_component/UserInfo';

dayjs.locale('ko');
dayjs.extend(relativeTime);

type Props = {
	params: { room: string };
};
export default async function ChatRoom({ params }: Props) {
	const session = await auth();
	const queryClient = new QueryClient();
	const ids = params.room.split('-').filter(v => v !== session?.user?.email);
	// 상대방 아이디가 없으면 return null
	if (!ids[0]) {
		return null;
	}
	await queryClient.prefetchQuery({
		// ids[0]을 상대방 정보를이런식으로 가져옴.
		queryKey: ['users', ids[0]],
		queryFn: getUserServer,
	});

	const messages = [
		{
			messageId: 1,
			roomId: 123,
			id: 'zerohch0',
			content: '안녕하세요.',
			createdAt: new Date(),
		},
		{
			messageId: 2,
			roomId: 123,
			id: 'hero',
			content: '안녕히가세요.',
			createdAt: new Date(),
		},
	];

	return (
		<main className={style.main}>
			<WebSocketComponent />
			{/*<MessageList />*/}
			<UserInfo id={ids[0]} />
			{/*<MessageList id={ids[0]} />*/}
			<MessageForm id={ids[0]} />
		</main>
	);
}

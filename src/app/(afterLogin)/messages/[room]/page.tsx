import { faker } from '@faker-js/faker';
import style from './chatRoom.module.css';
import Link from 'next/link';
import BackButton from '@/app/(afterLogin)/_component/BackButton';
import cx from 'classnames';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import WebSocketComponent from '@/app/_component/WebSocketProvider';
import Room from '../_component/Room';

dayjs.locale('ko');
dayjs.extend(relativeTime);

export default function ChatRoom() {
	const user = {
		id: 'hero',
		nickname: '영웅',
		image: faker.image.avatar(),
	};
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
			<div className={style.header}>
				<h3>쪽지</h3>
			</div>
			<Room />
			<Room />
			<Room />
			<Room />
			<Room />
			<Room />
		</main>
	);
}

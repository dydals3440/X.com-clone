import { faker } from '@faker-js/faker';
import style from './message.module.css';
import Room from './_component/Room';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: '쪽지 / Z',
	description: '쪽지를 내보내세요.',
};

export default function Home() {
	return (
		<main className={style.main}>
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

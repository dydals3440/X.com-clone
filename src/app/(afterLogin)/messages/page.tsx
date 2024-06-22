import { faker } from '@faker-js/faker';
import style from './message.module.css';
import Room from './_component/Room';

export default function Home() {
	return (
		<main className={style.main}>
			<div className={style.header}>
				<h3>쪽지</h3>
			</div>
			<Room />
		</main>
	);
}

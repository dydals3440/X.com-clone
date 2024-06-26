import Link from 'next/link';
import style from './trend.module.css';
import { Hashtag } from '@/model/Hashtag';

type Props = { trend: Hashtag };

export default function Trend({ trend }: Props) {
	return (
		<Link href={`/search?q=${trend.title}`} className={style.container}>
			<div className={style.count}>실시간트렌드</div>
			<div className={style.title}>{trend.title}</div>
			{/* toLocaleString()하면 1000자리 넘어갈떄마다 알아서 , 찍힘 */}
			<div className={style.count}>{trend.count.toLocaleString()} posts</div>
		</Link>
	);
}

'use client';

import style from '../search.module.css';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Tab() {
	const [current, setCurrent] = useState('hot');
	const router = useRouter();
	const searchParams = useSearchParams();

	const onClickHot = () => {
		setCurrent('hot');
		let url = `/search?q=${searchParams.get('q')}`;

		// has라고 하면 true/false, get은 pf
		if (searchParams.has('pf')) {
			url += `&pf=${searchParams.get('pf')}`;
		}

		router.replace(url);
	};

	const onClickNew = () => {
		setCurrent('new');
		// searchParams.toString() => 지금있는 searchParam 그대로 다쓰고 뒤에 붙여라 쿼리스트링
		let url = `/search?q=${searchParams.get('q')}&f=live`;

		if (searchParams.has('pf')) {
			url += `&pf=${searchParams.get('pf')}`;
		}

		router.replace(url);
	};

	return (
		<div className={style.homeFixed}>
			<div className={style.homeTab}>
				<div onClick={onClickHot}>
					인기
					<div className={style.tabIndicator} hidden={current === 'new'}></div>
				</div>
				<div onClick={onClickNew}>
					최신
					<div className={style.tabIndicator} hidden={current === 'hot'}></div>
				</div>
			</div>
		</div>
	);
}

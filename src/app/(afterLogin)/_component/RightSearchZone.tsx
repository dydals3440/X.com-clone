'use client';

import style from '@/app/(afterLogin)/_component/rightSearchZone.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SearchForm from './SearchForm';

export default function RightSearchZone() {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	const onChangeFollow = () => {
		// let url = `/search?q=${searchParams.get('q')}&pf=on`;
		// if (searchParams.has('f')) {
		// 	url += `&f=${searchParams.get('f')}`;
		// }
		// router.replace(url);
		// searchParams 직접 만드는 방법
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.set('pf', 'on');
		router.replace(`/search?${newSearchParams.toString()}`);
	};

	const onChangeAll = () => {
		// let url = `/search?q=${searchParams.get('q')}`;
		// if (searchParams.has('f')) {
		// 	url += `$f=${searchParams.get('f')}`;
		// }
		// router.replace(url);

		// 새로운 방법
		// 1. newSearchParams로 기존거 한번 복사한 다음.
		// 기존의 useSearchParams는 readOnly라 수정을 못하기떄문.
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.delete('pf');
		router.replace(`/search?${newSearchParams.toString()}`);
	};

	if (pathname === '/explore') {
		return null;
	}

	if (pathname === '/search') {
		return (
			<div>
				<h5 className={style.filterTitle}>검색 필터</h5>
				<div className={style.filterSection}>
					<div>
						<label>사용자</label>
						<div className={style.radio}>
							<div>모든 사용자</div>
							<input
								type="radio"
								name="pf"
								defaultChecked
								onChange={onChangeAll}
							/>
						</div>
						<div className={style.radio}>
							<div>내가 팔로우하는 사람들</div>
							<input
								type="radio"
								name="pf"
								value="on"
								onChange={onChangeFollow}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div style={{ marginBottom: 60, width: 'inherit' }}>
			<SearchForm />
		</div>
	);
}

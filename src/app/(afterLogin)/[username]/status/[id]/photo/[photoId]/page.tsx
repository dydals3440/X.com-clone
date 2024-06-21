import Home from '@/app/(afterLogin)/home/page';

type Props = {
	params: {
		username: string;
		id: string;
		photoId: string;
	};
};

// 모달 뒷 배경
export default function Page({ params }: Props) {
	return <Home />;
}

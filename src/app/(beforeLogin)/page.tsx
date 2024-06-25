import { auth } from '@/auth';
import Main from './_component/Main';
import { redirect } from 'next/navigation';

export default async function Home() {
	// useSession의 서버 버전
	const session = await auth();
	if (session?.user) {
		redirect('/home');
		return null;
	}
	return (
		<>
			<Main />
		</>
	);
}

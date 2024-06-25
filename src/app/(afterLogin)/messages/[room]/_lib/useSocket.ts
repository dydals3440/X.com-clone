import { useCallback, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

// 커스텀 훅 간의 공유할 것들은 안티패턴 이용
let socket: Socket | null;

export default function useSocket(): [Socket | null, () => void] {
	// const {data: session} = useSession();
	const disconnect = useCallback(() => {
		socket?.disconnect();
		socket = null;
	}, []);

	useEffect(() => {
		if (!socket) {
			// 소켓 생기는거
			socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}/messages`, {
				// 소켓 iO는 사실 웹소켓을 지원하지만, 웹 소켓이 없는 구형 브라우저에서는
				// HTTP 폴링이라는 것을 지원 (웹소켓은 서버에서 우리한테 데이터를 보내주는데, 반대로 웹소켓이 없을떄는)
				// 주기적으로, 서버에게 데이터 있어? 이렇게 물어보면서 요청을보냄(폴링)
				// Socket.io는 혹시나 웹소켓을 지원안할까봐 폴링도 함. 굳디 폴링안하고, 웹소켓만 쓰겠다임.
				transports: ['websocket'],
			});
			// // 다른 프로토콜이기에 여기서 로그인 한번더
			// socket.on('connect', () => {
			// 	console.log('websocket connected');
			// 	// if(session?.user?.email)
			// 	// 백엔드에서 보내달라는 양식
			// 	socket?.emit('login', 'session email');
			// });
			socket.on('connect_error', err => {
				console.error(err);
				console.log(`connect_error due to ${err.message}`);
			});
		}
	}, []);

	// useEffect(() => {
	// 	if (socket?.connected && session?.user?.email) {
	// 		socket?.emit('login', { id: session?.user?.email });
	// 	}
	// }, [session]);

	return [socket, disconnect];
}

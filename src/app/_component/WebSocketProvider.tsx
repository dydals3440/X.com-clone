'use client';

import useSocket from '../(afterLogin)/messages/[room]/_lib/useSocket';

export default function WebSocketComponent() {
	// 아무것도 안하고 연결만 맺음.
	useSocket();
	return null;
}

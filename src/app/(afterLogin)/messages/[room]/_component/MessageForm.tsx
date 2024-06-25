import {
	ChangeEventHandler,
	FormEventHandler,
	useEffect,
	useState,
} from 'react';
import useSocket from '../_lib/useSocket';

interface Props {
	id: string;
}

export default function MessageForm({ id }: Props) {
	const [content, setContent] = useState('');
	const [socket] = useSocket();

	const onChangeContent: ChangeEventHandler<HTMLTextAreaElement> = e => {
		setContent(e.target.value);
	};

	const onSubmit: FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault();
		// 이벤트 이름. (메세지 전송)
		socket?.emit('sendMessage', {
			senderId: 'email',
			receiverId: id,
			content,
		});
		// 리액트 쿼리 데이터에 추가 (Optimistic Update)
		setContent('');
	};

	useEffect(() => {
		socket?.on('receiveMessage', data => {
			console.log(data, 'data');
		});

		return () => {
			socket?.off('receiveMessage');
		};
	});
}

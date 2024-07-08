export interface Message {
	messageId: string;
	senderId: string;
	receiverId: string;
	room: string;
	content: string;
	createdAt: string;
}

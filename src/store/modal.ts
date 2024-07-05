import { create } from 'zustand';
import { Post } from '@/model/Post';

interface ModalState {
	mode: 'new' | 'comment';
	data: Post;
	setMode(mode: 'new' | 'comment'): void;
	setData(data: Post): void;
	reset(): void;
}

export const useModalStore = create<ModalState>(set => ({
	mode: 'new',
	data: null,
	// mode를 바꾸는 함수.
	setMode(mode) {
		set({ mode });
	},
	// data를 바꾸는 함수.
	setData(data) {
		set({ data });
	},
	reset() {
		set({
			mode: 'new',
			data: null,
		});
	},
}));

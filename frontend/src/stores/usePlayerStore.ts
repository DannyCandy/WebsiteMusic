import { create } from "zustand";
import { Song } from "@/types";
import { useChatStore } from "./useChatStore";

interface PlayerStore {
	currentSong: Song | null;
	isPlaying: boolean;
	isRepeat: boolean;
	queue: Song[];
	currentIndex: number;

	initializeQueue: (songs: Song[]) => void;
	playAlbum: (songs: Song[], startIndex?: number) => void;
	setCurrentSong: (song: Song | null) => void;
	togglePlay: () => void;
	playNext: () => void;
	playPrevious: () => void;
	shuffleSongs: () => void;
	replay: () => void;
	toggleRepeat: () => void;
	setCurrentTime: (time: number) => void; // for lyrics jumping purpose
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
	currentSong: null,
	isPlaying: false,
	isRepeat: false,
	queue: [],
	currentIndex: -1,

	initializeQueue: (songs: Song[]) => {
		console.log("songs[0]", songs[0]);
		console.log("get().currentSong", get().currentSong);
		console.log("queue[0]", get().queue[0]);
		set({
			queue: songs,
			currentSong: get().currentSong || songs[0],
			currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
		});
		console.log("Sau khi init: queue ",get().queue);
		console.log("songs[0]", songs[0]);
		console.log("get().currentSong", get().currentSong);
		console.log("queue[0]", get().queue[0]);
	},

	playAlbum: (songs: Song[], startIndex = 0) => {
		if (songs.length === 0) return;

		const song = songs[startIndex];

		const socket = useChatStore.getState().socket;
		if (socket.auth) {
			socket.emit("update_activity", {
				userId: socket.auth.userId,
				activity: `Playing ${song.title} by ${song.artist}`,
			});
		}
		set({
			queue: songs,
			currentSong: song,
			currentIndex: startIndex,
			isPlaying: true,
		});
	},

	setCurrentSong: (song: Song | null) => {
		if (!song) return;

		const socket = useChatStore.getState().socket;
		if (socket.auth) {
			socket.emit("update_activity", {
				userId: socket.auth.userId,
				activity: `Playing ${song.title} by ${song.artist}`,
			});
		}

		const songIndex = get().queue.findIndex((s) => s._id === song._id);
		set({
			currentSong: song,
			isPlaying: true,
			currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
		});
	},

	togglePlay: () => {
		const willStartPlaying = !get().isPlaying;

		const currentSong = get().currentSong;
		const socket = useChatStore.getState().socket;
		if (socket.auth) {
			socket.emit("update_activity", {
				userId: socket.auth.userId,
				activity:
					willStartPlaying && currentSong ? `Playing ${currentSong.title} by ${currentSong.artist}` : "Idle",
			});
		}

		set({
			isPlaying: willStartPlaying,
		});
	},

	playNext: () => {
		const { currentIndex, queue } = get();
		const nextIndex = currentIndex + 1; 	

		// if there is a next song to play, let's play it
		if (nextIndex < queue.length) {
			const nextSong = queue[nextIndex];

			const socket = useChatStore.getState().socket;
			if (socket.auth) {
				socket.emit("update_activity", {
					userId: socket.auth.userId,
					activity: `Playing ${nextSong.title} by ${nextSong.artist}`,
				});
			}

			set({
				currentSong: nextSong,
				currentIndex: nextIndex,
				isPlaying: true,
			});
		} else {
			// no next song
			set({ isPlaying: false });

			const socket = useChatStore.getState().socket;
			if (socket.auth) {
				socket.emit("update_activity", {
					userId: socket.auth.userId,
					activity: `Idle`,
				});
			}
		}
	},

	shuffleSongs: () => {
		const { queue, currentIndex } = get();
		const shuffledQueue = [...queue].sort(() => Math.random() - 0.5);
		const nextSong = shuffledQueue[currentIndex];

		const socket = useChatStore.getState().socket;
		if (socket.auth) {
			socket.emit("update_activity", {
				userId: socket.auth.userId,
				activity: `Playing ${nextSong.title} by ${nextSong.artist}`,
			});
		}

		set({
			queue: shuffledQueue,
			currentSong: nextSong,
			isPlaying: true,
		});
	},

	replay: () => {
		const { currentSong, currentIndex, queue } = get();
		console.log('lặp lại');
		if (!currentSong || queue.length === 0) return;

		const songAtIndex = queue[currentIndex];

		const currentSongIndex = get().queue.findIndex((s) => s._id === currentSong._id);
		console.log('currentSongIndex', currentSongIndex);
		console.log('currentIndex', currentIndex);
		console.log('songAtIndex', songAtIndex);
		console.log('currentSong._id', currentSong._id);
		console.log('songAtIndex._id', songAtIndex._id);

		if (!songAtIndex || songAtIndex._id !== currentSong._id) return;
		console.log('lặp lại 3');
		const socket = useChatStore.getState().socket;
		if (socket.auth) {
			socket.emit("update_activity", {
			userId: socket.auth.userId,
			activity: `Replaying ${currentSong.title} by ${currentSong.artist}`,
			});
		}

		set({
			currentSong: { ...currentSong }, // New reference to trigger re-render
			isPlaying: true,
		});
	},

	toggleRepeat: () => {
		const { isRepeat } = get();
		set({ isRepeat: !isRepeat });
	},
	// for lyrics jumping purpose
	setCurrentTime: (time: number) => {
		const audio = document.querySelector("audio") as HTMLAudioElement;
		if (audio) {
			audio.currentTime = time;
			if (!get().isPlaying) {
				set({ isPlaying: true }); // Ensure playback starts if paused
				audio.play().catch((error) => console.error("Play failed:", error));
			}
		}
	},
	playPrevious: () => {
		const { currentIndex, queue } = get();
		const prevIndex = currentIndex - 1;

		// theres a prev song
		if (prevIndex >= 0) {
			const prevSong = queue[prevIndex];

			const socket = useChatStore.getState().socket;
			if (socket.auth) {
				socket.emit("update_activity", {
					userId: socket.auth.userId,
					activity: `Playing ${prevSong.title} by ${prevSong.artist}`,
				});
			}

			set({
				currentSong: prevSong,
				currentIndex: prevIndex,
				isPlaying: true,
			});
		} else {
			// no prev song
			set({ isPlaying: false });

			const socket = useChatStore.getState().socket;
			if (socket.auth) {
				socket.emit("update_activity", {
					userId: socket.auth.userId,
					activity: `Idle`,
				});
			}
		}
	},
}));

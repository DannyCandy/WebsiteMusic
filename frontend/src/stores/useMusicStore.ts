import { axiosInstance } from "@/lib/axios";
import { Album, Song } from "@/types";
import { create } from "zustand";

interface MusicStore {
	songs: Song[];
	albums: Album[];
	isLoading: boolean;
	error: string | null;
	currentAlbum: Album | null;
	featuredSongs: Song[];
	madeForYouSongs: Song[];
	trendingSongs: Song[];

	fetchAlbums: () => Promise<void>;
	fetchAlbumById: (id: string) => Promise<void>;
	fetchSongs: () => Promise<void>;
	fetchSongById: (id: string) => Promise<void>;
	fetchAllSongsForUser: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
	albums: [],
	songs: [],
	isLoading: false,
	error: null,
	currentAlbum: null,
	madeForYouSongs: [],
	featuredSongs: [],
	trendingSongs: [],
	stats: {
		totalSongs: 0,
		totalAlbums: 0,
		totalUsers: 0,
		totalArtists: 0,
	},
 
	//thuộc admin nên cho phép lấy hàng loạt
	fetchSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/songs");
			set({ songs: response.data });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchAlbums: async () => {
		set({ isLoading: true, error: null });

		try {
			const response = await axiosInstance.get("/albums");
			set({ albums: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchAlbumById: async (id) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get(`/albums/${id}`);
			set({ currentAlbum: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchSongById: async (id) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get(`/albums/${id}`);
			set({ currentAlbum: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},
	//fetch song cho trang home, nguoi dung su dung
	fetchAllSongsForUser: async () => {
		set({ isLoading: true, error: null });

		try {
			const [featuredResponse, madeForYouResponse, trendingResponse] = await Promise.all([
				axiosInstance.get("/songs/featured"),
				axiosInstance.get("/songs/made-for-you"),
				axiosInstance.get("/songs/trending")
			]);

			set({ 
				featuredSongs: featuredResponse.data,
				madeForYouSongs: madeForYouResponse.data,
				trendingSongs: trendingResponse.data
			});
		} catch (error: any) {
			set({ error: error.response?.data?.message || "Failed to fetch songs" });
		} finally {
			set({ isLoading: false });
		}
	},
}));

import { Album, Song } from "@/types";
import { create } from "zustand";
type DialogType = 'editSong' | 'editAlbum' | 'deleteSong' | 'deleteAlbum';
interface DialogStore {
  isOpen: boolean;
  type: DialogType;
  currentSong: Song | null;
  currentAlbum: Album | null;
  idToDelItem: string | null;

  openUpdateSongDialog: (song: Song) => void;
  openUpdateAlbumDialog: ( album: Album) => void;
  setTypeAndOpen: (type: DialogType) => void;
  resetIdToDelItem: () => void;
  closeDialog: () => void;
  openDeleteSongDialog: (id: string) => void;
  openDeleteAlbumDialog: (id: string) => void;
};
export const useDialogStore = create<DialogStore>(( set ) => ({
  isOpen: false,
  type: 'editSong',
  currentSong: {
    title: '',
    artist: '',
    albumId: '',
    lyrics: '',
    _id: '',
    imageUrl: '',
    audioUrl: '',
    duration: 0,
    createdAt: '',
    updatedAt: '',
  },
  currentAlbum: {
    title: '',
    artist: '',
    imageUrl: '',
    releaseYear: 2000,
    songs: [],
    _id: '',
  },
  idToDelItem: null,

  openUpdateSongDialog: (song) => set((state) => ({
    isOpen: true,
    type: 'editSong',
    currentSong: {
      ...state.currentSong, // Giữ nguyên giá trị hiện tại nếu có
      ...song, // Ghi đè bằng giá trị mới
    }
  })),

  openDeleteSongDialog: (id) => set({
    isOpen: true,
    type: 'deleteSong',
    idToDelItem: id
  }),

  openDeleteAlbumDialog: (id) => set({
    isOpen: true,
    type: 'deleteAlbum',
    idToDelItem: id,
  }),

  openUpdateAlbumDialog: (album: Album) => set({ isOpen: true, type: 'editAlbum', currentAlbum: album }),
  setTypeAndOpen: (type: DialogType) => set({ isOpen: true, type: type }),
  closeDialog: () => set({ isOpen: false }),
  resetIdToDelItem: () => set({ idToDelItem: null }),
}));
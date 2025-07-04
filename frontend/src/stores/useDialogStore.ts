import { Album, Song } from "@/types";
import { create } from "zustand";
type DialogType = 'editSong' | 'editAlbum' ;
interface DialogStore {
  isOpen: boolean;
  type: DialogType;
  currentSong: Song | null;
  currentAlbum: Album | null;

  openUpdateSongDialog: (song: Song) => void;
  openUpdateAlbumDialog: ( album: Album) => void;
  setTypeAndOpen: (type: DialogType) => void;
  closeDialog: () => void;
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

  openUpdateSongDialog: (song) => set((state) => ({
    isOpen: true,
    type: 'editSong',
    currentSong: {
      ...state.currentSong, // Giữ nguyên giá trị hiện tại nếu có
      ...song, // Ghi đè bằng giá trị mới
    }
  })),

  openUpdateAlbumDialog: (album: Album) => set({ isOpen: true, type: 'editAlbum', currentAlbum: album }),
  setTypeAndOpen: (type: DialogType) => set({ isOpen: true, type: type }),
  closeDialog: () => set({ isOpen: false }),
}));
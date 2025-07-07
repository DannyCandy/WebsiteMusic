import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
// import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./pages/chat/ChatPage";
import AlbumPage from "./pages/album/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";
import SongLibrary from "./pages/songlibrary/SongLibrary";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/404/NotFoundPage";
import SongPage from "./pages/lyrics/SongPage";
import Profile from "./pages/profile/Profile";
import SearchPage from "./pages/search/SearchPage";
import { useDialogStore } from "./stores/useDialogStore";
import UpdateSongDialog from "./pages/admin/components/UpdateSongDialog";
import UpdateAlbumDialog from "./pages/admin/components/UpdateAlbumDialog";
import UnauthorizedPage from "./pages/404/AuthorizedPage";
import DeleteSongDialog from "./pages/admin/components/DeleteSongDialog";
import DeleteAlbumDialog from "./pages/admin/components/DeleteAlbumDialog";

function App() {
	const {isOpen, type} = useDialogStore();
	return (
		<>
			{isOpen && type === 'editSong' && <UpdateSongDialog />}
			{isOpen && type === 'editAlbum' && <UpdateAlbumDialog />}
			{isOpen && type === 'deleteSong' && <DeleteSongDialog />}
			{isOpen && type === 'deleteAlbum' && <DeleteAlbumDialog />}
			<Routes>
				{/* <Route
					path='/sso-callback'
					element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />}
				/> */}
				<Route path='/auth-callback' element={<AuthCallbackPage />} />
				<Route path='/admin' element={<AdminPage />} />
				<Route path='/unauthorized' element={<UnauthorizedPage />} />
				<Route element={<MainLayout />}>
					<Route path='/' element={<HomePage />} />
					<Route path='/chat' element={<ChatPage />} />
					<Route path='/albums/:albumId' element={<AlbumPage />} />
					<Route path="/profile" element={<Profile />} /> {/* Add the Profile route */}
					<Route path='/songs/:songId' element={<SongPage/>} />
					<Route path='/songs' element={<SongLibrary />} />
					<Route path="/search" element={<SearchPage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Route>
			</Routes>
			<Toaster />
		</>
	);
}

export default App;

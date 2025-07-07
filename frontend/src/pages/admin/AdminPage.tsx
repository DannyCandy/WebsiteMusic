import { useAuthStore } from "@/stores/useAuthStore";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Album, Music } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";
import { useEffect } from "react";
import { useAdminMusicStore } from "@/stores/useAdminMusicStore";
import UnauthorizedPage from "../404/AuthorizedPage";
import { updateApiToken } from "@/lib/utils";
import { useAuth } from "@clerk/clerk-react";

const AdminPage = () => {
	const { isAdmin, isLoading } = useAuthStore();
	const { getToken } = useAuth();
	const { fetchStats } = useAdminMusicStore();
	useEffect(() => {
	/**
	 * Fetches the token from Clerk and updates axios with the token.
	 * Then fetches the stats from the server.
	 */
		const fetchStatus = async () => {
			const token = await getToken();
			if (token) {
				updateApiToken(token);
			}
			await fetchStats();
		}
		fetchStatus();
	}, [fetchStats, getToken]);

	if (!isAdmin && !isLoading) {
		return <UnauthorizedPage />;
	}

	return (
		<div
			className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900
   to-black text-zinc-100 p-8'
		>
			<Header />

			<DashboardStats />

			<Tabs defaultValue='songs' className='space-y-6'>
				<TabsList className='p-1 bg-zinc-800/50'>
					<TabsTrigger value='songs' className='data-[state=active]:bg-zinc-700'>
						<Music className='mr-2 size-4' />
						Songs
					</TabsTrigger>
					<TabsTrigger value='albums' className='data-[state=active]:bg-zinc-700'>
						<Album className='mr-2 size-4' />
						Albums
					</TabsTrigger>
				</TabsList>

				<TabsContent value='songs'>
					<SongsTabContent />
				</TabsContent>
				<TabsContent value='albums'>
					<AlbumsTabContent />
				</TabsContent>
			</Tabs>
		</div>
	);
};
export default AdminPage;

import { useMusicStore } from "@/stores/useMusicStore";
import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import PlayButton from "./PlayButton";
import { useNavigate } from "react-router-dom";

const FeaturedSection = () => {
	const { isLoading, featuredSongs, error } = useMusicStore();
	const navigate = useNavigate();
	if (isLoading) return <FeaturedGridSkeleton />;

	const handleCardClick = (e: React.MouseEvent, songId: string) => {
		const target = e.target as HTMLElement
		const isButtonClick = target.closest("button")

		if (isButtonClick) {
			return;
		}
		navigate(`/songs/${songId}`)
	}

	if (error) return <p className='text-red-500 mb-4 text-lg'>{error}</p>;

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
			{featuredSongs.map((song) => (
				<div
					key={song._id}
					onClick={(e) => handleCardClick(e, song._id)}
					className='flex items-center bg-zinc-800 rounded-md overflow-hidden
					hover:bg-zinc-700/80 transition-colors group cursor-pointer relative'
				>
					<img
						src={song.imageUrl}
						alt={song.title}
						className='w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0'
					/>
					<div className='flex-1 p-4'>
						<p className='font-medium truncate'>{song.title}</p>
						<p className='text-sm text-zinc-400 truncate'>{song.artist}</p>
					</div>
					<PlayButton song={song} />
				</div>
			))}
		</div>
	);
};
export default FeaturedSection;

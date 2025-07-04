import { Song } from "@/types";
import SectionGridSkeleton from "./SectionGridSkeleton";
import PlayButton from "./PlayButton";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type SectionGridProps = {
	title: string;
	songs: Song[];
	isLoading: boolean;
};
const SectionGrid = ({ songs, title, isLoading }: SectionGridProps) => {
	const navigate = useNavigate();
	const handleCardClick = (e: React.MouseEvent, songId: string) => {
		const target = e.target as HTMLElement
		const isButtonClick = target.closest("button")

		if (isButtonClick) {
			return;
		}
		navigate(`/songs/${songId}`)
	}

	if (isLoading) return <SectionGridSkeleton />;

	return (
		<div className='mb-8'>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-xl sm:text-2xl font-bold'>{title}</h2>
				{/* <Button variant='link' className='text-sm text-zinc-400 hover:text-white'>
					Show all
				</Button> */}
				<Link
					to={"/songs"}
					className={cn(
						buttonVariants({
							variant: "secondary",
							className: " text-sm text-zinc-200 hover:text-green-500",
						})
					)}
				>
					<span className='hidden md:inline'>Show all</span>
				</Link>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
				{songs.map((song) => (
					<div
						key={song._id}
						onClick={(e) => handleCardClick(e, song._id)}
						className='bg-zinc-800 p-4 rounded-md hover:bg-zinc-700/80 transition-all group cursor-pointer'
					>
						<div className='relative mb-4'>
							<div className='aspect-square rounded-md shadow-lg overflow-hidden'>
								<img
									src={song.imageUrl}
									alt={song.title}
									className='w-full h-full object-cover transition-transform duration-300 
									group-hover:scale-105'
								/>
							</div>
							<PlayButton song={song} />
						</div>
						<h3 className='font-medium mb-2 truncate'>{song.title}</h3>
						<p className='text-sm text-zinc-400 truncate'>{song.artist}</p>
					</div>
				))}
			</div>
		</div>
	);
};
export default SectionGrid;

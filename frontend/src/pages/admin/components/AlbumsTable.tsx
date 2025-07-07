import SongTableSkeleton from "@/components/skeletons/admin/SongTableSkeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useCustomQuery from "@/lib/hooks/useCustomQuery";
import { useDebounce } from "@/lib/hooks/useDebounce";
import useSearchFilter from "@/lib/hooks/useSearchFilter";
import { useDialogStore } from "@/stores/useDialogStore";
import { Album } from "@/types";
import { AlertTriangle, Calendar, ChevronLeft, ChevronRight, Edit2, Filter, Music, RefreshCw, Search, Trash2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const filterOptions = [
  {label: "Mặc định", value: {}},
  {label: "Mới nhất", value: {sortBy: "createdAt", order: "desc"}}, 
  {label: "Tên từ A-Z", value: {sortBy: "title", order: "asc"}},
  {label: "Tên từ Z-A", value: {sortBy: "title", order: "desc"}},
]

const AlbumsTable = () => {
	const { openUpdateAlbumDialog, openDeleteAlbumDialog } = useDialogStore();
	const [searchQuery, setSearchQuery] = useState("")
	 const [filter, setFilter] = useState("")
	const [ query, updateQuery ] = useCustomQuery({
		q:"",
		page: 1,
		order: "asc",
	});
	const { data, isLoading, isError, isPlaceholderData, error, refetch, isFetching } = useSearchFilter<Album>( query, "/admin/albums");
	const debouncedSearch = useDebounce(searchQuery, 700);
	useEffect(() => {
		const filtered = debouncedSearch.trim().replace(/\s+/g, " ");
		updateQuery({
			q: filtered
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[debouncedSearch])
	console.log("data", data);
	const [pageRange, setPageRange] = useState<number[]>([]);
	useEffect(() => {
		const totalPages = data?.totalPages || 1;
		if(totalPages < 4){
			setPageRange(Array.from({ length: totalPages },(_, i) => i + 1))
			return;
		}else{
			if (data?.hasNextPage && data?.hasPrevPage) {
			setPageRange([data.page - 1, data.page, data.page + 1])
			return;
			}

			if (data?.hasNextPage && !data?.hasPrevPage) {
			setPageRange([data.page, data.page + 1, data.page + 2]);
			return;
			}

			if (!data?.hasNextPage && data?.hasPrevPage) {
			setPageRange([data.page - 2, data.page - 1, data.page])
			return;
			}
		}
	},[data])
	const handleSort = (indexOtp: number) => {
		setFilter(filterOptions[indexOtp].label);
		updateQuery({...filterOptions[indexOtp].value, page:1});
	}

	const goToPage = (page: number) => {
		updateQuery({page});
	}

	const handleRefresh = useCallback(async () => {
		await refetch();
	}, [refetch]);

	if (isLoading || isFetching) {
		return <SongTableSkeleton />
	}

	if (isError) {
		return (
			<div className='flex items-center justify-center py-8 space-y-4'>
				<Alert className="border-red-500/20 bg-red-500/10">
					<AlertTriangle className="h-4 w-4 text-red-500" />
						<AlertDescription className="text-red-400">
							<div className="flex items-center justify-between">
								<div>
									<strong>Error loading albums:</strong> {error.message}
								</div>
								<Button
									variant="outline"
									size="sm"
									onClick={handleRefresh}
									className="bg-transparent border-red-500/30 text-red-400 hover:bg-red-500/20"
									>
										<RefreshCw className="h-3 w-3 mr-1" />
									Retry
								</Button>
							</div>
						</AlertDescription>
				</Alert>
			</div>
		);
	}

	return (
      	<div className="space-y-4">
			{/* Search and Filter Bar */}
			<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
				{/* Search Input */}
				<div className="relative flex-1 max-w-sm">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
					<Input
						placeholder="Search albums..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-gray-400 focus:border-emerald-500"
					/>
					{searchQuery && (
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setSearchQuery("")}
							className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-zinc-700"
						>
							<X className="h-3 w-3" />
						</Button>
					)}
				</div>

				{/* Filters */}
				<div className="flex gap-3 items-center">
					<div className="flex items-center gap-2 text-sm text-gray-400">
						<Filter className="h-4 w-4" />
						<span>Filter by:</span>
					</div>

					{/* Artist Filter */}
					<Select onValueChange={(e) => handleSort(Number(e))}>
						<SelectTrigger className="w-[140px] bg-zinc-800/50 border-zinc-700 text-white">
							<SelectValue placeholder="Sắp xếp" />
						</SelectTrigger>
						<SelectContent className="bg-zinc-800 border-zinc-700">
							{filterOptions.map((opt, i) => (
								<SelectItem key={i} value={i.toString()} className="text-white hover:bg-zinc-700">
									{opt.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* Results Info */}
			<div className="flex items-center justify-between text-sm text-gray-400">
				<span>
					Showing {data?.docs.length} of {data?.totalDocs} albums
				</span>
				{filter && (
				<div className="flex items-center gap-2">
					<span>Active filters:</span>
					{searchQuery && (
						<span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs">
							Search: "{searchQuery}"
						</span>
					)}
					<span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Filter: {filter}</span>
				</div>
				)}
			</div>

			{/* Table */}
			<div className="rounded-md border border-zinc-700 bg-zinc-800/30">
				<Table>
					<TableHeader>
						<TableRow className='hover:bg-zinc-800/50'>
							<TableHead className='w-[50px]'></TableHead>
							<TableHead>Title</TableHead>
							<TableHead>Artist</TableHead>
							<TableHead>Release Year</TableHead>
							<TableHead>Songs</TableHead>
							<TableHead className='text-right'>Actions</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{
							data?.docs.length === 0 ? (
								<TableRow>
									<TableCell colSpan={6} className="text-center py-8 text-gray-400">
										{"No albums found"}
									</TableCell>
								</TableRow>
							):(
							data?.docs.map((album) => (
								<TableRow key={album._id} className='hover:bg-zinc-800/50'>
									<TableCell>
										<img src={album.imageUrl} alt={album.title} className='w-10 h-10 rounded object-cover' />
									</TableCell>
									<TableCell className='font-medium'>{album.title}</TableCell>
									<TableCell>{album.artist}</TableCell>
									<TableCell>
										<span className='inline-flex items-center gap-1 text-zinc-400'>
											<Calendar className='h-4 w-4' />
											{album.releaseYear}
										</span>
									</TableCell>
									<TableCell>
										<span className='inline-flex items-center gap-1 text-zinc-400'>
											<Music className='h-4 w-4' />
											{album.songs.length} songs
										</span>
									</TableCell>
									<TableCell className='text-right'>
										<div className='flex gap-2 justify-end'>
											<Button className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10" 
												variant="ghost" 
												size="sm"
												onClick={() => openUpdateAlbumDialog(album)}
											>
												<Edit2 className="h-4 w-4" />
											</Button>
											<Button
												variant='ghost'
												size='sm'
												onClick={() => openDeleteAlbumDialog(album._id)}
												className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
											>
												<Trash2 className='h-4 w-4' />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							)))
						}
					</TableBody>
				</Table>
			</div>

			{/* Simple Pagination - Only 5 buttons */}
			<div className="flex items-center justify-center gap-2 pt-4">
				{/* Previous Button */}
				<Button
					variant="outline"
					size="sm"
					onClick={() => goToPage(query.page - 1)}
					disabled={isPlaceholderData || !data?.hasPrevPage}
					className="bg-transparent border-zinc-600 text-gray-300 hover:bg-zinc-700 hover:text-white disabled:opacity-50"
				>
					<ChevronLeft className="h-4 w-4" />
				</Button>

				{/* Page Numbers (3 buttons) */}
				{pageRange.map((pageNum) => (
					<Button
					key={pageNum}
					variant={query.page === pageNum ? "default" : "outline"}
					size="sm"
					onClick={() => goToPage(pageNum)}
					className={
						query.page === pageNum
						? "bg-emerald-600 hover:bg-emerald-700 text-white"
						: "bg-transparent border-zinc-600 text-gray-300 hover:bg-zinc-700 hover:text-white"
					}
					>
						{pageNum}
					</Button>
				))}

				{/* Next Button */}
				<Button
					variant="outline"
					size="sm"
					onClick={() => goToPage(query.page + 1)}
					disabled={isPlaceholderData || !data?.hasNextPage}
					className="bg-transparent border-zinc-600 text-gray-300 hover:bg-zinc-700 hover:text-white disabled:opacity-50"
				>
					<ChevronRight className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};
export default AlbumsTable;
		
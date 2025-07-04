import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, MoreHorizontal, Filter, ChevronLeft, ChevronRight, Share2, Download } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import useCustomQuery from "@/lib/hooks/useCustomQuery"
import useSearchFilter from "@/lib/hooks/useSearchFilter"
import { Song } from "@/types"
import { ShowAllSongSkeleton } from "@/components/skeletons/ShowAllSongSkeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatDuration } from "@/lib/utils"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"


const filterOptions = [
  {label: "Mặc định", value: {}},
  {label: "Mới nhất", value: {sortBy: "createdAt", order: "desc"}}, 
  {label: "Tên từ A-Z", value: {sortBy: "title", order: "asc"}},
  {label: "Tên từ Z-A", value: {sortBy: "title", order: "desc"}},
]

export function SongLibrary() {
  const [ query, updateQuery, resetQuery ] = useCustomQuery({
    page: 1,
    limit: 8,
    order: "asc",
  });
  const { data, isLoading, isError, isPlaceholderData, isFetching } = useSearchFilter( query);
  const navigate = useNavigate();
  // const queryClient = useQueryClient();
  console.log("data", data);

  const handleSort = (indexOtp: number) => {
    // if(isFetching){
    //   queryClient.cancelQueries({ queryKey });
    // }
    updateQuery({...filterOptions[indexOtp].value, page:1});
  }

  const goToPage = (page: number) => {
    // if(isFetching){
    //   queryClient.cancelQueries({ queryKey });
    // }
    updateQuery({page});
  }

  const clearFilter = () => {
    // if(isFetching){
    //   queryClient.cancelQueries({ queryKey });
    // }
    resetQuery();
  }
  
  const handleShareSong = (songId: string) => {
    navigator.clipboard.writeText(`${window.location.href}/${songId}`)
    toast.success("Link copied to clipboard");
  }

  // Xử lý khi click vào card
  const handleCardClick = (songId: string, event: React.MouseEvent) => {
    // Kiểm tra xem click có phải từ button hay không
    const target = event.target as HTMLElement
    const isButtonClick = target.closest("button") || target.closest('[role="button"]')

    if (isButtonClick) {
      return // Không xử lý nếu click vào button
    }

    // Điều hướng đến trang chi tiết bài hát
    navigate(`/songs/${songId}`)
  }

  if(isLoading){
    return <ShowAllSongSkeleton />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col rounded-md">
      <div className="flex-1 flex flex-col px-6 py-4">
        {/* Header */}
        <div className="mb-2">
          <h1 className="text-4xl font-bold mb-2">Your music world</h1>
          <p className="text-gray-400">Discover and play your favorite tracks</p>
        </div>

        {/* Filters */}
        <div className="mb-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[300px]">
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400 mr-2" />
              <Select onValueChange={(e) => handleSort(Number(e))}>
                <SelectTrigger className="w-[120px] bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Sắp xếp" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectGroup>
                    {filterOptions.map((e,i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {e.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Songs Grid in ScrollArea - Takes remaining space */}
        {isFetching ? (
          <div className="h-[calc(90vh-240px)] w-full rounded-md border border-gray-700 bg-gray-900/50 flex items-center justify-center">
            <ScrollArea className="h-full w-full p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }, (_, i) => (
                  <Card key={i} className="bg-gray-800/50 border-gray-700 transition-all duration-300">
                    <CardContent className="p-3">
                      <div className="relative mb-3">
                        {/* Image Skeleton */}
                        <div className="w-full aspect-square bg-gray-700 rounded-md animate-pulse"></div>

                        {/* Badge Skeleton */}
                        <div className="absolute top-1.5 left-1.5 h-5 w-8 bg-gray-600 rounded animate-pulse"></div>
                      </div>

                      <div className="space-y-1.5">
                        {/* Title Skeleton */}
                        <div className="h-4 w-full bg-gray-600 rounded animate-pulse"></div>

                        {/* Artist Skeleton */}
                        <div className="h-3 w-3/4 bg-gray-700 rounded animate-pulse"></div>

                        {/* Album Skeleton */}
                        <div className="h-3 w-2/3 bg-gray-700 rounded animate-pulse"></div>

                        <div className="flex items-center justify-between pt-1.5">
                          {/* Duration Skeleton */}
                          <div className="h-3 w-8 bg-gray-700 rounded animate-pulse"></div>

                          {/* Action Buttons Skeleton */}
                          <div className="flex items-center gap-0.5">
                            <div className="w-5 h-5 bg-gray-700 rounded animate-pulse"></div>
                            <div className="w-5 h-5 bg-gray-700 rounded animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        ) : (
          <div className="h-[calc(90vh-240px)] w-full rounded-md border border-gray-700 bg-gray-900/50 flex items-center justify-center">
            <ScrollArea className="h-full w-full p-4">
              {data?.docs.length === 0 || isError ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="text-gray-400 text-lg">{isError ? "Something went wrong" : "No songs found matching your criteria!"}</p>
                  <Button
                    variant="outline"
                    onClick={() => {clearFilter()}}
                    className="mt-4 bg-gray-800 border-gray-700 hover:bg-gray-700"
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {data?.docs.map((song: Song) => (
                    <Card
                      key={song._id}
                      onClick={(e) => handleCardClick(song._id, e)}
                      className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-all duration-300 group cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/10"
                    >
                      <CardContent className="p-3">
                        <div className="relative mb-3">
                          <img
                            src={song.imageUrl || "/placeholder.svg"}
                            alt={song.title}
                            className="w-full aspect-square object-cover rounded-md"
                          />

                          {/* Genre Badge */}
                          <Badge
                            variant="secondary"
                            className="absolute top-1.5 left-1.5 bg-black/70 text-white text-xs px-1.5 py-0.5"
                          >
                            Song
                          </Badge>
                        </div>

                        <div className="space-y-1.5">
                          <h3 className="font-semibold text-white truncate group-hover:text-green-400 transition-colors text-sm">
                            {song.title}
                          </h3>
                          <p className="text-xs text-gray-400 truncate">{song.artist}</p>
                          <p className="text-xs text-gray-500 truncate">{song.albumName ?? "Unknown Album"}</p>

                          <div className="flex items-center justify-between pt-1.5">
                            <span className="text-xs text-gray-500">{formatDuration(song.duration)}</span>
                            <div className="flex items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => {console.log("Nhấn tym");}}
                                className="w-5 h-5 hover:bg-gray-600"
                              >
                                <Heart
                                  className={`w-3.5 h-3.5 ${
                                    Math.random() > 0.5
                                      ? "fill-red-500 text-red-500"
                                      : "text-gray-400 hover:text-red-500"
                                  }`}
                                />
                              </Button>
                              {/* <Button size="icon" variant="ghost" className="w-5 h-5 hover:bg-gray-600">
                                <MoreHorizontal className="w-3.5 h-3.5 text-gray-400" />
                              </Button> */}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button size="icon" variant="ghost" className="w-5 h-5 hover:bg-gray-600" onClick={(e) => e.stopPropagation()} >
                                    <MoreHorizontal className="w-3.5 h-3.5 text-gray-400" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  className="bg-gray-800 border-gray-700 text-white"
                                  align="start"
                                  sideOffset={5}
                                >
                                  <DropdownMenuItem
                                    onClick={() => handleShareSong(song._id)}
                                    className="hover:bg-gray-700 cursor-pointer"
                                  >
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Share
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {console.log("Nhán tải xuống");}}
                                    className="hover:bg-gray-700 cursor-pointer"
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        )}
        
      </div>

      {/* Pagination - Fixed at bottom, overlapping the ScrollArea */}
      <div className="sticky bottom-0 bg-gradient-to-t from-black via-black/95 to-transparent pt-6 pb-4 px-6 rounded-md">
        {/* <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(query.page - 1)}
            disabled={!data?.hasPrevPage}
            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {Array.from({ length: data?.totalPages || 1 }, (_, i) => i + 1).map((p) => (
            <Button
              key={p}
              variant={data?.page === p ? "default" : "outline"}
              onClick={() => goToPage(p)}
              className={
                data?.page === p
                  ? "bg-green-500 hover:bg-green-400 text-black"
                  : "bg-gray-800 text-zinc-100 hover:bg-gray-700"
              }
            >
              {p}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(query.page + 1)}
            disabled={!data?.hasNextPage}
            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div> */}
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(query.page - 1)}
            disabled={isPlaceholderData || !data?.hasPrevPage}
            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {Array.from({ length: data?.totalPages || 1 }, (_, i) => i + 1).map((p) => (
            <Button
              key={p}
              variant={query.page === p ? "default" : "outline"}
              onClick={() => goToPage(p)}
              className={
                query.page === p
                  ? "bg-green-500 hover:bg-green-400 text-black"
                  : "bg-gray-800 text-zinc-100 hover:bg-gray-700"
              }
            >
              {p}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(query.page + 1)}
            disabled={isPlaceholderData || !data?.hasNextPage}
            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SongLibrary
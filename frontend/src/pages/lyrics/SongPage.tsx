import { useCallback, useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Heart, Share2, Download, Clock, Calendar, Music, User, Album } from "lucide-react"
import { useParams } from "react-router-dom"
import { usePlayerStore } from "@/stores/usePlayerStore"
import { Loader2 } from "lucide-react"
import { axiosInstance } from "@/lib/axios"
import { Song } from "@/types"
import PlayButton from "../home/components/PlayButton"
import { formatDuration } from "@/lib/utils"

const SongPage = () => {
  const [ isLiked, setIsLiked ] = useState(false)
  // Dữ liệu mẫu cho bài hát
  const { songId } = useParams();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ song, setSong ] = useState<Song | null>(null);
  const { initializeQueue } = usePlayerStore();

  console.log("rerender");
  const fetchSongById = useCallback(async (songId:string) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/songs/id`,{
        params: {
          id: songId
        }
      });
      const result = response.status === 200 ? response.data : null;
      console.log(result);
      setSong(result);
      if(result != null){
        //Xử lý tiếp chỗ này, quy hoạch lại kiến trúc hoạt động nghe nhạc
        initializeQueue([result]);
      }
    } catch (error: any) {
      setErrorMessage( error.response.data.message );
    } finally {
      setIsLoading(false);
    }
  },[]);

  useEffect(() => {
    if (songId){
      fetchSongById(songId);
    }
  }, [fetchSongById, songId]);
  const duration = formatDuration(song?.duration || 0);
  if (isLoading || errorMessage) 
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-indigo-800 to-purple-950 flex items-center justify-center p-4">
        <div className="text-center space-y-8">
          {/* Main Loading Spinner */}
          <div className="relative">
            <div className="w-20 h-20 mx-auto">
              <Loader2 className="w-20 h-20 animate-spin text-green-600" />
            </div>

            {/* Pulsing Ring Effect */}
            <div className="absolute inset-0 w-20 h-20 mx-auto">
              <div className="w-full h-full rounded-full border-4 border-green-900 animate-pulse"></div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-slate-200 animate-pulse">Loading ... </h2>
            <p className="text-gray-400">{errorMessage || "Everything is almost ready ..."}</p>
          </div>
        </div>
      </div>
    )

  return (
    <div className="h-full">
      <ScrollArea className='h-full rounded-md'>
        {/* Main Player Card */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-4 bg-gradient-to-b from-lime-600 via-indigo-900 to-gray-800">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Album Cover */}
              <div className="flex-shrink-0">
                <img
                  src={song?.imageUrl || "/placeholder.svg"}
                  alt={`${song?.title} cover`}
                  className="w-48 h-48 rounded-lg object-cover shadow-lg mx-auto md:mx-0"
                />
              </div>

              {/* Song Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-950 mb-2">{song?.title}</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {song?.artist}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Album className="w-3 h-3" />
                      {song?.title}
                    </Badge>
                  </div>
                </div>

                {/* Song Details */}
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-zinc-300" />
                    <span className="text-zinc-300">Thời lượng: {duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-zinc-300" />
                    <span className="text-zinc-300">Phát hành: {song?.createdAt.split("T")[0]}</span>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex flex-wrap gap-3 pt-4">
                  {/* <Button size="lg" onClick={() => setIsPlaying(!isPlaying)} className="flex items-center gap-2">
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    {isPlaying ? "Tạm dừng" : "Phát nhạc"}
                  </Button> */}
                  {song && <PlayButton song={song} />}

                  <Button
                    variant={isLiked ? "default" : "outline"}
                    size="lg"
                    onClick={() => setIsLiked(!isLiked)}
                    className="flex items-center gap-2"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                    Yêu thích
                  </Button>

                  <Button variant="outline" size="lg" className="flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Chia sẻ
                  </Button>

                  <Button variant="outline" size="lg" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Tải xuống
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>

          <Separator />

          {/* Lyrics Section */}
          <CardContent className="pt-6 bg-gray-800">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                <Music className="w-5 h-5 text-zinc-100" />
                Lời bài hát
              </h3>

              <Card className="bg-violet-500/20">
                <CardContent className="p-6">
                  <ScrollArea className="h-96">
                    <div className="space-y-3">
                      {song?.lyrics}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info Card */}
        {/* <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Thông tin thêm</h3>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-900 mb-1">Sáng tác:</p>
                <p className="text-gray-600">Nhạc sĩ XYZ</p>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Sản xuất:</p>
                <p className="text-gray-600">Studio ABC Music</p>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Thể loại:</p>
                <p className="text-gray-600">Ballad, Pop Việt</p>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Ngôn ngữ:</p>
                <p className="text-gray-600">Tiếng Việt</p>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </ScrollArea>
    </div>
  )
}

export default SongPage;

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Heart, Share2, Download, Clock, Calendar, Music, User, Album, Pause, Play } from "lucide-react"
import { useParams } from "react-router-dom"
import { usePlayerStore } from "@/stores/usePlayerStore"
import { Loader2 } from "lucide-react"
import { axiosInstance } from "@/lib/axios"
import { Song } from "@/types"
import { formatDuration } from "@/lib/utils"
import toast from "react-hot-toast"

const SongPage = () => {
  const [ isLiked, setIsLiked ] = useState(false)
  const { songId } = useParams();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ song, setSong ] = useState<Song | null>(null);
  const { setCurrentSong, currentSong, togglePlay, isPlaying: isPlayingGlobal } = usePlayerStore();
  const [ isPlaying, setIsPlaying ] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const duration = useMemo(() => formatDuration(song?.duration || 0), [song]);
  console.log("song id", songId);

  useEffect(() => {
    audioRef.current = document.querySelector("audio");
  }, []);

  useEffect(() => {
    console.log("vô useEffect, currentSong? , ref", currentSong?._id === songId, audioRef.current);
    if(currentSong?._id === songId) {
      setIsPlaying(isPlayingGlobal);
      return;
    }
    setIsPlaying(false);
  }, [isPlaying, isPlayingGlobal, currentSong, songId]); 

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
      if(result != null){
        setSong(result as Song);
      }
    } catch (error: any) {
      setErrorMessage( error.response.data.message );
    } finally {
      setIsLoading(false);
    }
  },[]);

  const handlePlayPause = (song: Song | null) => {
    if(!song) return;
    if(song._id === currentSong?._id){
      togglePlay();
      setIsPlaying(isPlayingGlobal);
      return;
    }
    setCurrentSong(song);
    setIsPlaying(isPlayingGlobal);
  }

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.href}`)
    toast.success("Link copied to clipboard");
  }

  useEffect(() => {
    if (songId){
      fetchSongById(songId);
    }
  }, [fetchSongById, songId]);

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
              {/* Album Cover with play button*/}
              <div className="flex-shrink-0 relative group">
                <img
                  src={song?.imageUrl || "/placeholder.svg"}
                  alt={`${song?.title} cover`}
                  className="w-48 h-48 rounded-lg object-cover shadow-lg mx-auto md:mx-0 transition-all duration-300 group-hover:brightness-75"
                />

                {/* Play/Pause Button Overlay - Only visible on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <Button
                    size="icon"
                    onClick={() =>  handlePlayPause(song)}
                    className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-400 text-black hover:scale-110 transition-all duration-200 shadow-lg"
                  >
                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                  </Button>
                </div>
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

                  <Button
                    variant={isLiked ? "default" : "outline"}
                    size="lg"
                    onClick={() => setIsLiked(!isLiked)}
                    className="flex items-center gap-2"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                    Yêu thích
                  </Button>

                  <Button variant="outline" size="lg" className="flex items-center gap-2" onClick={handleShare}>
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
      </ScrollArea>
    </div>
  )
}

export default SongPage;

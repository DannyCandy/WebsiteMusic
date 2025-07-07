import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { axiosInstance } from "@/lib/axios";
import { updateApiToken } from "@/lib/utils";
import { useAdminMusicStore } from "@/stores/useAdminMusicStore";
import { useDialogStore } from "@/stores/useDialogStore";
import { useAuth } from "@clerk/clerk-react";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface NewSong {
	title: string | undefined;
	artist: string| undefined;
	imageUrl: string| undefined;
	lyrics: string| undefined;
	duration: number| undefined;
	album: string| null;
}

const UpdateSongDialog = () => {
	console.log("rerender");
	const { updateSpecificSongInStore, albums } = useAdminMusicStore();
	const [isLoading, setIsLoading] = useState(false);
	const { currentSong: song, type, isOpen, closeDialog, setTypeAndOpen } = useDialogStore();
	const [newSong, setNewSong] = useState<NewSong>({
		title: song?.title,
		artist: song?.artist,
		imageUrl: song?.imageUrl,
		lyrics: song?.lyrics,
		duration: song?.duration as number,
		album: song!.albumId ?? 'none',
	});
	console.log("newSong", newSong);
	console.log("song", song);
	const [audioFile, setAudioFile] = useState<File | null>(null);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const { getToken } = useAuth();
	const audioInputRef = useRef<HTMLInputElement>(null);
	const imageInputRef = useRef<HTMLInputElement>(null);

	const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImageFile(file);
		}
	};
	const handleAudioSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setAudioFile(file);
		}
	};
	const handleOpenChange = (open: boolean) => {
        if (!open) {
            closeDialog();
        } else {
            setTypeAndOpen("editSong");
        }
    };
	const handleSubmit = async () => {
		
		if (!imageFile) {
            if(!newSong.imageUrl) {
                return toast.error("Please upload an image");
            }
        }
		if (!audioFile) {
			if(!song?.audioUrl) {
				return toast.error("Please upload an audio");
			}
		}
		setIsLoading(true);
		const formData = new FormData();

		formData.append("title", newSong.title!);
		formData.append("artist", newSong.artist!);
		formData.append("duration", newSong.duration!.toString());
		formData.append("lyrics", newSong.lyrics!);
		formData.append("albumId", newSong.album!);

		if(imageFile){
			formData.append("imageFile", imageFile);
		}
		if(audioFile){
			formData.append("audioFile", audioFile);
		}
		const token = await getToken();
		if (token) {
			updateApiToken(token);
		}
		const promise = axiosInstance.post(`/admin/songs/update/${song?._id}`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
		.then((response) => {
			if (response.status === 204) {
				closeDialog();
				updateSpecificSongInStore(newSong, song!._id);
			}
		}) .catch((err) => {
			// propagate error để toast xử lý
			throw err;
		}).finally(() => {
			setIsLoading(false); // Kết thúc loading
		});

		toast.promise(
            promise,
            {
                loading: "Đang lưu...",
                success: () => `Cập nhật thành công`,
                error: (err) => {
                    const message = err?.response?.data?.error || err.message || err.toString();
                    return `Thất bại: ${message}`;
                },
            },
            {
                success: {
                    duration: 2000,
                    icon: "🎉",
                    style: {
                        background: '#4ade80',
                    },
                },
                error: {
                    duration: 3000,
                    icon: "🚨",
                    style: {
                        background: '#f87171',
                    },
                },
            }
        );
	};

	return (
		<Dialog open={isOpen && type === "editSong"} onOpenChange={handleOpenChange}>
			{/* <DialogTrigger asChild>
				<Button className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10" variant="ghost" size="sm">
					<Edit2 className="h-4 w-4" />
				</Button>
			</DialogTrigger> */}

			<DialogContent className='bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto'>
				<DialogHeader>
					<DialogTitle>Update song</DialogTitle>
					<DialogDescription>Adjust the song details</DialogDescription>
				</DialogHeader>

				<div className='space-y-4 py-4'>
					<input
						type='file'
						accept='audio/*'
						ref={audioInputRef}
						hidden
						onChange={handleAudioSelect}
					/>

					<input
						title="Select audio file"
						type='file'
						ref={imageInputRef}
						className='hidden'
						accept='image/*'
						onChange={handleImageSelect}
					/>

					{/* image upload area */}
					<div
						className='flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer'
						onClick={() => imageInputRef.current?.click()}
					>
						<div className='text-center'>
							{newSong.imageUrl && !imageFile ? (
                                <div className="mb-2">
                                    <img
                                        src={newSong.imageUrl || "/placeholder.svg"}
                                        alt="Current"
                                        className="w-16 h-16 rounded mx-auto mb-2"
                                    />
                                    <div className="text-sm text-zinc-400">Current image</div>
                                </div>
                            ) : (
                                <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                                    <Upload className="h-6 w-6 text-zinc-400" />
                                </div>
                            )}
                            <div className="text-sm text-zinc-400 mb-2">
                                {imageFile ? imageFile.name : "Upload new song artwork"}
                            </div>
                            <Button variant="outline" size="sm" className="text-xs bg-transparent">
                                Choose File
                            </Button>
						</div>
					</div>

					{/* Audio upload */}
					<div className='space-y-2'>
						<label className='text-sm font-medium'>Audio File</label>
						<div className='flex items-center gap-2'>
							<Button variant='outline' onClick={() => audioInputRef.current?.click()} className='w-full'>
								{audioFile ? audioFile.name.slice(0, 20) : "Choose Audio File"}
							</Button>
						</div>
					</div>

					{/* other fields */}
					<div className='space-y-2'>
						<label className='text-sm font-medium'>Title</label>
						<Input
							value={newSong.title}
							onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
							className='bg-zinc-800 border-zinc-700'
						/>
					</div>

					<div className='space-y-2'>
						<label className='text-sm font-medium'>Artist</label>
						<Input
							value={newSong.artist}
							onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
							className='bg-zinc-800 border-zinc-700'
						/>
					</div>

					<div className='space-y-2'>
						<label className='text-sm font-medium'>Duration (seconds)</label>
						<Input
							type='number'
							min='0'
							value={newSong.duration}
							onChange={(e) => {
								const value = Number(e.target.value);
								setNewSong({ ...newSong, duration: isNaN(value) ? 0 : value });
							}}
							className='bg-zinc-800 border-zinc-700'
						/>
					</div>

					<div className='space-y-2'>
						<label className='text-sm font-medium'>Album (Optional)</label>
						<Select
							value={newSong.album!}
							onValueChange={(value) => setNewSong({ ...newSong, album: value })}
						>
							<SelectTrigger className='bg-zinc-800 border-zinc-700'>
								<SelectValue placeholder='Select album' />
							</SelectTrigger>
							<SelectContent className='bg-zinc-800 border-zinc-700'>
								<SelectItem value='none'>No Album (Single)</SelectItem>
								{albums.map((album) => (
									<SelectItem key={album._id} value={album._id}>
										{album.title}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				<DialogFooter>
					<Button variant='outline' onClick={() => closeDialog()} disabled={isLoading}>
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={isLoading}>
						{isLoading ? "Uploading..." : "Add Song"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
export default UpdateSongDialog;

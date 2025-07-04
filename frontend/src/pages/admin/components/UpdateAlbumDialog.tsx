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
import { axiosInstance } from "@/lib/axios";
import { useAdminMusicStore } from "@/stores/useAdminMusicStore";
import { useDialogStore } from "@/stores/useDialogStore";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const UpdateAlbumDialog = () => {
    // const [initValue, setInitValue] = useState({
	// 	title: "",
	// 	artist: "",
    //     imageUrl: "",
	// 	releaseYear: new Date().getFullYear(),
	// });
    console.log("rerender");
	const [isLoading, setIsLoading] = useState(false);
    const {updateSpecificAlbumInStore} = useAdminMusicStore();
	const editFileInputRef = useRef<HTMLInputElement>(null);
    const { currentAlbum: album, type, isOpen, closeDialog, setTypeAndOpen } = useDialogStore();
	const [newAlbum, setNewAlbum] = useState({
		title: album?.title,
		artist: album?.artist,
        imageUrl:  album?.imageUrl ,
		releaseYear: album?.releaseYear 
	});

	const [imageFile, setImageFile] = useState<File | null>(null);

	const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImageFile(file);
		}
	};

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            closeDialog();
        } else {
            setTypeAndOpen("editSong");
        }
    };

	const handleEditSubmit = () => {
        if (!imageFile) {
            if(!newAlbum.imageUrl) {
                return toast.error("Please upload an image");
            }
        }
        setIsLoading(true);

        const formData = new FormData();
        formData.append("title", newAlbum.title!);
        formData.append("artist", newAlbum.artist!);
        formData.append("releaseYear", newAlbum.releaseYear!.toString());
        if (imageFile) {
            formData.append("imageFile", imageFile);
        }

        const promise = axiosInstance
            .put(`/admin/albums/update/${album}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                if (response.status === 204) {
                    closeDialog();
                    updateSpecificAlbumInStore(newAlbum, album!._id);
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
        <Dialog open={isOpen && type === "editAlbum"} onOpenChange={handleOpenChange}>
            {/* <DialogTrigger asChild>
				<Button className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10" variant="ghost" size="sm">
					<Edit2 className="h-4 w-4" />
				</Button>
			</DialogTrigger> */}
            <DialogContent className="bg-zinc-900 border-zinc-700">
                <DialogHeader>
                    <DialogTitle>Edit Album</DialogTitle>
                    <DialogDescription>Update album information</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <input
                        placeholder="Input your album's cover image"
                        type="file"
                        ref={editFileInputRef}
                        onChange={handleImageSelect}
                        accept="image/*"
                        className="hidden"
                    />
                    <div
                        className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
                        onClick={() => editFileInputRef.current?.click()}
                    >
                        <div className="text-center">
                            {newAlbum.imageUrl && !imageFile ? (
                                <div className="mb-2">
                                    <img
                                        src={newAlbum.imageUrl || "/placeholder.svg"}
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
                                {imageFile ? imageFile.name : "Upload new album artwork"}
                            </div>
                            <Button variant="outline" size="sm" className="text-xs bg-transparent">
                                Choose File
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Album Title</label>
                        <Input
                            value={newAlbum.title}
                            onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
                            className="bg-zinc-800 border-zinc-700"
                            placeholder="Enter album title"
                        />
                    </div>
                    <div className="space-y-2">
                    <label className="text-sm font-medium">Artist</label>
                    <Input
                        value={newAlbum.artist}
                        onChange={(e) => setNewAlbum({ ...newAlbum, artist: e.target.value })}
                        className="bg-zinc-800 border-zinc-700"
                        placeholder="Enter artist name"
                    />
                    </div>
                    <div className="space-y-2">
                    <label className="text-sm font-medium">Release Year</label>
                    <Input
                        type="number"
                        value={newAlbum.releaseYear}
                        onChange={(e) => setNewAlbum({ ...newAlbum, releaseYear: Number.parseInt(e.target.value) })}
                        className="bg-zinc-800 border-zinc-700"
                        placeholder="Enter release year"
                        min={1900}
                        max={new Date().getFullYear()}
                    />
                    </div>
                </div>
                <DialogFooter>
                <Button variant="outline" onClick={() => closeDialog()} disabled={isLoading}>
                    Cancel
                </Button>
                <Button
                    onClick={handleEditSubmit}
                    className="bg-violet-500 hover:bg-violet-600"
                    disabled={isLoading || !newAlbum?.title || !newAlbum?.artist}
                >
                    {isLoading ? "Updating..." : "Update Album"}
                </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default UpdateAlbumDialog
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AlertTriangle, Trash2, X } from "lucide-react"
import { useDialogStore } from "@/stores/useDialogStore";
import { useAdminMusicStore } from "@/stores/useAdminMusicStore";
import { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { updateApiToken } from "@/lib/utils";
import { useAuth } from "@clerk/clerk-react";
const DeleteSongDialog = () => {

    console.log("rerender");
	const [ isLoading, setIsLoading ] = useState(false);
    const { deleteSong } = useAdminMusicStore();
    const { type, isOpen, closeDialog, setTypeAndOpen, idToDelItem, resetIdToDelItem } = useDialogStore();
    const { getToken } = useAuth();
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            closeDialog();
        } else {
            setTypeAndOpen("deleteSong");
        }
    };

	const handleConfirmDelete = async () => {
        if(!idToDelItem){
            toast.error("No song selected");
            return;
        }
        setIsLoading(true);
        const token = await getToken();
        if (token) {
            updateApiToken(token);
        }
        const promise = axiosInstance
            .delete(`/admin/songs/${idToDelItem}`)
            .then((response) => {
                if (response.status === 200) {
                    closeDialog();
                    deleteSong(idToDelItem);
                    resetIdToDelItem();
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
                loading: "Đang xử lý...",
                success: () => `Xóa thành công`,
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
        <AlertDialog open={isOpen && type === "deleteSong"} onOpenChange={handleOpenChange}>
            <AlertDialogContent className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
                <AlertDialogHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10 ring-4 ring-purple-500/20">
                        <AlertTriangle className="h-8 w-8 text-purple-500" />
                    </div>
                    <AlertDialogTitle className="text-xl font-semibold text-white">Delete song</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-300 text-base">
                        Are you sure you want to delete this<span className="font-semibold text-white">song</span>
                        <br />
                        <span className="text-purple-400 text-sm mt-2 block">
                        This action cannot be undone
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col sm:flex-row gap-3">
                    <AlertDialogCancel asChild>
                        <Button 
                            className="flex-1 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                            onClick={() => closeDialog()} disabled={isLoading}
                        >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                        </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
                            disabled={isLoading}
                            onClick={handleConfirmDelete}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Confirm
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default DeleteSongDialog
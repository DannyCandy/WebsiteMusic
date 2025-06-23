// src/components/Topbar.jsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { useBackgroundVideoStore } from "@/stores/useBackgroundVideoStore"; // Import the store

const Topbar = () => {
  const { setBackgroundVideo } = useBackgroundVideoStore();

  // Handler for video file selection
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setBackgroundVideo(videoUrl);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-zinc-900">
      {/* Left side: Logo or branding */}
      <div className="text-xl font-bold text-white">Music App</div>

      {/* Right side: Admin Dashboard link and Choose Video button */}
      <div className="flex items-center space-x-4">
        <Link to="/admin" className="text-white hover:text-gray-300">
          Admin Dashboard
        </Link>

        {/* Choose Video Button */}
        <Button
          variant="ghost"
          className="bg-gray-700 text-white hover:bg-gray-600 rounded-full p-2"
          asChild
        >
          <label htmlFor="video-upload">
            <Video className="h-6 w-6" />
            <input
              id="video-upload"
              type="file"
              className="hidden"
              accept="video/mp4"
              onChange={handleVideoChange}
            />
          </label>
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
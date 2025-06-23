import { useUser } from "@clerk/clerk-react"; // Hook to get current user data
import { Edit, Instagram, Twitter, Facebook } from "lucide-react"; // Icons for edit and social media
const Profile = () => {
  // Fetch current user data from Clerk
  const { user } = useUser();

  // Fallback username and image if user data is unavailable
  const username = user?.fullName || user?.username || "Unknown User";
  const profileImageUrl = user?.imageUrl || "https://via.placeholder.com/150"; // Placeholder image
  //absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 text-white flex flex-col items-center justify-center p-4">
      {/* Profile Header */}
      
      <div className="flex flex-col items-center">
        {/* Profile Photo */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
            <img
              src={profileImageUrl}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/150"; // Fallback on error
              }}
            />
          </div>

        </div>

        {/* Username */}
        <h1 className="text-5xl font-bold mt-4">{username}</h1>
      </div>

      
      {/* Social Media Icons */}
      <div className="mt-8 flex space-x-4">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <Instagram className="h-6 w-6 text-gray-400 hover:text-white" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <Twitter className="h-6 w-6 text-gray-400 hover:text-white" />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <Facebook className="h-6 w-6 text-gray-400 hover:text-white" />
        </a>
      </div>
    </div>
  );
};

export default Profile;
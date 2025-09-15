import { useNavigate } from "react-router";
import type { MessageUser } from "../../../utils/types/message";
import { useAuthStore } from "../../../store/useAuthStore";

export default function User({ user }: { user: MessageUser }) {
  const { onlineUsers } = useAuthStore();
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center gap-3 hover:bg-white/10 p-2 rounded-lg cursor-pointer"
      onClick={() => {
        navigate(`/message?id=${user._id}`);
      }}
    >
      {/* Avatar + Status */}
      <div className="relative flex-shrink-0">
        <div
          className={`size-3 rounded-full ${
            onlineUsers?.includes(user._id) ? "bg-green-500" : "bg-gray-500"
          } border border-white absolute top-0 right-0`}
        ></div>
        <img
          src={user.profilePicture || "https://avatar.iran.liara.run/public/18"}
          alt="Avatar"
          className="w-12 h-12 rounded-full border-2 border-blue-400 object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-base sm:text-lg font-semibold truncate">
            {user.name}
          </h2>
          <span className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-0">
            2:30 PM
          </span>
        </div>
        <p className="text-gray-300 text-sm sm:text-base truncate">
          Hey! How are you?
        </p>
      </div>
    </div>
  );
}

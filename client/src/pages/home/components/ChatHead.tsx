import { useNavigate } from "react-router";
import type { MessageUser } from "../../../utils/types/message";

export default function ChatHead({ user }: { user: MessageUser }) {
  const navigate = useNavigate();
  return (
    <div
      className="grid grid-cols-6 hover:bg-white/10 p-2 rounded-lg cursor-pointer"
      onClick={() => {
        navigate(`/message?id=${user._id}`);
      }}
    >
      <div className="col-span-1 relative">
        <div className="size-3 rounded-full bg-green-500 border border-white absolute"></div>
        <img
          src={user.profilePicture || "https://avatar.iran.liara.run/public/18"}
          alt="Avatar"
          className="w-12 h-12 rounded-full border-2 border-blue-400"
        />
      </div>
      <div className="col-span-5">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <span className="text-sm text-gray-400">2:30 PM</span>
        </div>
        <p className="text-gray-300">Hey! How are you?</p>
      </div>
    </div>
  );
}

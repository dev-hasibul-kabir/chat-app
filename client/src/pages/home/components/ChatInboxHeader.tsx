import { useEffect } from "react";
import { useMessageStore } from "../../../store/useMessageStore";
import { useAuthStore } from "../../../store/useAuthStore";

export default function ChatInboxHeader({
  partner_id,
}: {
  partner_id: string;
}) {
  const { onlineUsers } = useAuthStore();
  const { getActiveChatPartner, activechatPartner, requestStatus } =
    useMessageStore();

  const { loading } = requestStatus.getActiveChatPartner;

  useEffect(() => {
    if (partner_id) {
      getActiveChatPartner(partner_id);
    }
  }, [partner_id]);

  if (loading) return "Loading...";

  return (
    <div className="backdrop-blur-md bg-white/10 p-4 flex justify-between items-center flex-shrink-0 border-b border-white/30">
      <div className="flex gap-3">
        <img
          src={
            activechatPartner?.profilePicture ||
            "https://avatar.iran.liara.run/public/18"
          }
          alt="Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <div className="flex gap-2 items-center">
            <h2 className="text-lg font-semibold">{activechatPartner?.name}</h2>
            {!!onlineUsers?.includes(partner_id) ? (
              <span className="text-sm text-green-400">Online</span>
            ) : (
              <span className="text-sm  text-gray-300">Offline</span>
            )}
          </div>
          <p className="text-white">{activechatPartner?.email}</p>
        </div>
      </div>
    </div>
  );
}

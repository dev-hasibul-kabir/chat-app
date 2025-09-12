import { memo } from "react";
import type { Message as MessageType } from "../../../utils/types/message";
import { formatChatDate } from "../../../utils/utilKit";

function Message({
  msg,
  myId,
}: {
  msg: MessageType;
  myId: string | undefined;
}) {
  return (
    <div
      className={`flex ${
        msg.sender === myId ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`text-white p-3 rounded-lg max-w-xs ${
          msg.sender === myId ? "bg-sky-600" : "bg-white/10"
        } space-y-2`}
      >
        {!!msg.image && (
          <img
            src={msg.image}
            alt="Message Image"
            className="max-w-full h-auto rounded"
          />
        )}
        {!!msg.text && <p>{msg.text}</p>}

        <span className="text-xs text-gray-200">
          {formatChatDate(msg.createdAt)}
        </span>
      </div>
    </div>
  );
}

export default memo(Message);

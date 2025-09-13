import { useEffect, useRef, useState } from "react";
import { FaFileImage } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useSearchParams } from "react-router";
import { useMessageStore } from "../../../store/useMessageStore";
import Input from "../../../components/Input";
import { useAuthStore } from "../../../store/useAuthStore";
import Message from "./Message";

export default function Chat() {
  const [text, setText] = useState<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const {
    getMessages,
    sendMessage,
    activeChat,
    subscribeToNewMessages,
    unSubscribeFromNewMessages,
    requestStatus,
  } = useMessageStore();
  const { user } = useAuthStore();
  const searchParam = useSearchParams();
  const partner_id = searchParam[0].get("id");

  useEffect(() => {
    if (partner_id) {
      getMessages(partner_id);
      subscribeToNewMessages(partner_id);
    }

    return () => {
      unSubscribeFromNewMessages();
    };
  }, [
    partner_id,
    getMessages,
    subscribeToNewMessages,
    unSubscribeFromNewMessages,
  ]);

  function handleSendMessage() {
    try {
      if (!text.trim() || !partner_id) return;
      sendMessage(partner_id, { text: text.trim() });
      setText("");
    } catch (error) {
      console.log("Failed to send message:", error);
    }
  }

  function handleImmageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      const file = event.target.files?.[0];
      if (!file || !partner_id) return;

      sendMessage(partner_id, { image: file });
    } catch (error) {
      console.log("Failed to upload image:", error);
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [activeChat, requestStatus.getMessages.loading]);

  if (!partner_id)
    return (
      <p className="text-center mt-20">
        No chat selected.
        <br /> Pick a contact to begin or start a new conversation.
      </p>
    );

  return (
    <div className="flex flex-col h-full">
      <div className="backdrop-blur-md bg-white/10 p-4 flex justify-between items-center flex-shrink-0 border-b border-white/30">
        <div className="flex gap-3">
          <img
            src="https://avatar.iran.liara.run/public/18"
            alt="Avatar"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <div className="flex gap-2 items-center">
              <h2 className="text-lg font-semibold">John Doe</h2>
              <span className="text-sm text-green-400">Online</span>
            </div>
            <p className="text-white">@john</p>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white/10 backdrop-blur-sm overflow-y-auto scrollbar-thin p-6 space-y-4">
        {requestStatus.getMessages.loading
          ? "Loading..."
          : !!requestStatus.getMessages.error
          ? requestStatus.getMessages.error
          : activeChat?.length
          ? activeChat.map((msg) => (
              <Message key={msg._id} msg={msg} myId={user?._id} />
            ))
          : "No messages"}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 bg-white/10 backdrop-blur-md flex gap-3 items-center flex-shrink-0 border-t border-white/30">
        <Input
          className="flex-1 rounded-full pr-8"
          type="text"
          value={text}
          onChange={(val) => setText(val ? String(val) : "")}
          disabled={requestStatus.sendMessage.loading}
        />
        <button
          disabled={requestStatus.sendMessage.loading}
          onClick={handleSendMessage}
        >
          <IoSend
            className={`size-5 ${
              requestStatus.sendMessage.loading
                ? "text-white/40"
                : "text-white/70"
            }`}
          />
        </button>

        <input
          type="file"
          id="imageUpload"
          className="hidden"
          accept="image/*"
          onChange={handleImmageUpload}
          disabled={requestStatus.sendMessage.loading}
        />
        <label htmlFor="imageUpload" className="cursor-pointer">
          <FaFileImage className="size-7 text-white/70" />
        </label>
      </div>
    </div>
  );
}

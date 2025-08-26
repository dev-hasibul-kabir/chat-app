import Chat from "./components/Chat";
import ConversationList from "./components/ConversationList";

export default function MessagePage() {
  return (
    <div className="text-white flex gap-x-6">
      <div className="w-1/4">
        <ConversationList />
      </div>

      <div className="w-3/4 h-[98vh] backdrop-blur-md bg-white/10">
        <Chat />
      </div>
    </div>
  );
}

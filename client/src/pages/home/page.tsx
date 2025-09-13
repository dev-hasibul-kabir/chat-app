import { useSearchParams } from "react-router";
import Chat from "./components/Chat";
import ConversationList from "./components/ConversationList";

export default function MessagePage() {
  const searchParam = useSearchParams();
  const partner_id = searchParam[0].get("id");
  return (
    <div className="flex gap-6 h-full text-white overflow-hidden">
      <div
        className={`${
          partner_id ? "hidden" : "block"
        } w-full md:block md:w-2/5 lg:w-1/4 h-full`}
      >
        <ConversationList />
      </div>

      <div
        className={`${!partner_id ? "hidden" : "block"} md:block flex-1 h-full`}
      >
        <Chat />
      </div>
    </div>
  );
}

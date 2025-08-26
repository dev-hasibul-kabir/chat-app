import ChatHead from "./ChatHead";

export default function ConversationList() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Messages</h1>
      <input
        type="text"
        placeholder="Search"
        className="w-full px-4 py-2 rounded-full bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="mt-6 bg-white/10 backdrop-blur-md p-4 space-y-6 overflow-y-auto scrollbar-thin h-[86vh]">
        <ChatHead />
        <ChatHead />
        <ChatHead />
        <ChatHead />
        <ChatHead />
        <ChatHead />
        <ChatHead />
        <ChatHead />
        <ChatHead />
        <ChatHead />
        <ChatHead />
        <ChatHead />
        <ChatHead />
        <ChatHead />
        <ChatHead />
        <ChatHead />
        <ChatHead />
        <ChatHead />
        <ChatHead />
        <ChatHead />
      </div>
    </>
  );
}

interface ChatMessageSkeletonProps {
  isOwn?: boolean;
}

export default function ChatMessageSkeleton({
  isOwn = false,
}: ChatMessageSkeletonProps) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-3 rounded-lg max-w-xs space-y-2 animate-pulse ${
          isOwn ? "bg-sky-500/50" : "bg-white/20"
        }`}
      >
        <div className="h-3 w-16 bg-white/40 rounded-md" />
        <div className="h-3 w-20 bg-white/40 rounded-md" />
        <div className="h-3 w-40 bg-white/40 rounded-md" />

        <div className="mt-6 h-3 w-10 bg-white/40 rounded-md self-end" />
      </div>
    </div>
  );
}

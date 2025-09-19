export default function ChatListItemSkeleton() {
  return (
    <div
      className="flex items-center gap-3 p-2 rounded-lg"
      role="status"
      aria-label="Loading chat item"
    >
      <div className="relative flex-shrink-0">
        {/* avatar skeleton */}
        <div className="w-12 h-12 rounded-full bg-white/40 backdrop:blur-md animate-pulse" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="h-6 bg-white/40 backdrop:blur-md rounded-md w-5/12 sm:w-6/12 animate-pulse" />

          {/* <div className="h-3 bg-gray-400 rounded w-16 animate-pulse hidden sm:block" /> */}
        </div>

        <div className="mt-2">
          <div className="h-3 bg-white/40 backdrop:blur-md rounded w-8/12 sm:w-7/12 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

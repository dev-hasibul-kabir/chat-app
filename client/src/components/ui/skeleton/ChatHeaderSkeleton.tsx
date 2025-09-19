export default function ChatHeaderSkeleton() {
  return (
    <div className="backdrop-blur-md bg-white/10 p-4 flex justify-between items-center flex-shrink-0 border-b border-white/30">
      <div className="flex gap-3 w-full">
        <div className="w-12 h-12 rounded-full bg-white/40 animate-pulse" />

        <div className="flex flex-col justify-center gap-2 w-full">
          <div className="flex gap-2 items-center">
            <div className="h-5 w-32 bg-white/40 rounded-md animate-pulse" />
            <div className="h-2 w-8 bg-white/40 rounded-md animate-pulse" />
          </div>

          <div className="h-4 w-48 bg-white/40 rounded-md animate-pulse" />
        </div>
      </div>
    </div>
  );
}

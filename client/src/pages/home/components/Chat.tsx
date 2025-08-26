import { FaFileImage } from "react-icons/fa";

function PartnerMessage() {
  return (
    <div className="flex justify-start">
      <div className="bg-white/10 text-white p-3 rounded-lg max-w-xs">
        <p>Hello! How are you?</p>
        <span className="text-xs text-gray-200">2:30 PM</span>
      </div>
    </div>
  );
}

function MyMessage() {
  return (
    <div className="flex justify-end">
      <div className="bg-sky-600 text-white p-3 rounded-lg max-w-xs">
        <p>I'm good, thanks! How about you?</p>
        <span className="text-xs text-gray-200">2:31 PM</span>
      </div>
    </div>
  );
}

export default function Chat() {
  return (
    <>
      <div className="backdrop-blur-md bg-white/10 p-4 flex justify-between items-center ">
        <div className="flex gap-3">
          <div className="">
            <img
              src="https://avatar.iran.liara.run/public/18"
              alt="Avatar"
              className="w-12 h-12 rounded-full "
            />
          </div>
          <div className="">
            <div className="flex gap-2 items-center">
              <h2 className="text-lg font-semibold">John Doe</h2>
              <span className="text-sm text-green-400">Online</span>
            </div>
            <p className="text-white">@john</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="h-[80vh] overflow-y-auto scrollbar-thin p-6 space-y-4">
        <PartnerMessage />

        <MyMessage />
      </div>

      <div className="fixed bottom-0 left-0 w-full flex gap-3 items-center p-6 bg-white/10 backdrop-blur-md">
        <input
          type="text"
          className="w-full px-4 py-2 rounded-full bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <FaFileImage className="size-7 text-white/70" />
      </div>
    </>
  );
}

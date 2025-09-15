import { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { FiUsers } from "react-icons/fi";
import { useMessageStore } from "../../../store/useMessageStore";
import User from "./User";

export default function ConversationList() {
  const [searchTerm, setSearchTerm] = useState("");
  const { getUsers, users, requestStatus } = useMessageStore();
  const { loading, error } = requestStatus.getUsers;

  useEffect(() => {
    getUsers(searchTerm);
  }, [searchTerm]);

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-3xl font-bold mb-4">Messages</h1>
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name or email"
          className="relative w-full pl-4 pr-8 py-2 rounded-full bg-white/20 text-white 
               placeholder-white/70 focus:outline-none focus:ring-2 
               focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {!!searchTerm && (
          <RxCrossCircled
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setSearchTerm("")}
          />
        )}
      </div>

      <div
        className="mt-6 bg-white/10 backdrop-blur-md p-4 space-y-6 
                  overflow-y-auto scrollbar-thin flex-1"
      >
        {loading ? (
          "Loading..."
        ) : !!error ? (
          error
        ) : users?.length ? (
          users.map((user) => <User key={user._id} user={user} />)
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <FiUsers className="size-10" />
            <p className="text-xl tracking-wider text-center mt-4">No Users!</p>
          </div>
        )}
      </div>
    </div>
  );
}

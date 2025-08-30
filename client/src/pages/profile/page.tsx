import { useAuthStore } from "../../store/useAuthStore";

export default function Profile() {
  const { user } = useAuthStore();
  return (
    <div className="flex items-center justify-center  min-h-screen text-white">
      <div className="shadow-lg rounded-2xl p-8 w-full max-w-lg text-center backdrop-blur-sm bg-white/10">
        <img
          className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-blue-300 shadow-md"
          src={
            user?.profilePicture || "https://avatar.iran.liara.run/public/30"
          }
          alt="Profile Picture"
        />

        <h2 className="mt-4 text-2xl font-semibold">{user?.name}</h2>

        <p className=" mt-2">{user?.email}</p>
      </div>
    </div>
  );
}

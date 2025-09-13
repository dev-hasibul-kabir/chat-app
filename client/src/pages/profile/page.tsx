import { IoCamera } from "react-icons/io5";
import { useAuthStore } from "../../store/useAuthStore";
import { useRef, useState, type ChangeEvent } from "react";

export default function Profile() {
  const { user, updateProfile, requestStatus } = useAuthStore();
  const { loading, error } = requestStatus.updateProfile;
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selecteFile = e.target.files?.[0];
    if (selecteFile) {
      setPreview(URL.createObjectURL(selecteFile));

      try {
        const { success, message } = await updateProfile({
          profilePicture: selecteFile,
        });
        if (success) {
          console.log(message);
        } else {
          console.log(error);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white p-4">
      <div className="shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl text-center backdrop-blur-sm bg-white/10">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto border-4 border-blue-300 rounded-full">
          {loading ? (
            <img
              className="w-full h-full rounded-full object-cover blur-xs"
              src={preview || "https://avatar.iran.liara.run/public/30"}
              alt="Profile Picture"
            />
          ) : (
            <img
              className="w-full h-full rounded-full object-cover object-top"
              src={
                user?.profilePicture ||
                "https://avatar.iran.liara.run/public/30"
              }
              alt="Profile Picture"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={inputRef}
            className="hidden"
          />
          <IoCamera
            onClick={() => inputRef.current?.click()}
            className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 size-5 sm:size-6 md:size-8 text-blue-600 bg-white/20 backdrop-blur-md p-1 rounded-full cursor-pointer hover:border hover:border-blue-500"
          />
        </div>

        <h2 className="mt-4 text-lg sm:text-xl md:text-2xl font-semibold">
          {user?.name}
        </h2>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base">{user?.email}</p>
      </div>
    </div>
  );
}

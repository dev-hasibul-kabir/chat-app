import { NavLink } from "react-router";
import { FaComments, FaUserAlt, FaCog } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";

export default function SideNavBar() {
  const { user } = useAuthStore();

  const navItems = [
    { id: "chats", label: "Chats", icon: <FaComments />, path: "/" },
    { id: "profile", label: "Profile", icon: <FaUserAlt />, path: "/profile" },
    { id: "settings", label: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  return (
    <div className="h-screen w-24 flex flex-col items-center py-4 bg-white/10 backdrop-blur-md border-r border-white/20">
      {/* Profile */}
      <div className="flex flex-col items-center mb-8 text-white">
        <img
          src={
            user?.profilePicture || "https://avatar.iran.liara.run/public/30"
          }
          alt="profile"
          className="w-12 h-12 rounded-full"
        />
        <p className="text-xs mt-2 text-center break-words w-20">
          {user?.email ? user.email.split("@")[0] : ""}
        </p>
      </div>

      {/* Nav Items */}
      <div className="flex flex-col gap-6">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center text-sm ${
                isActive ? "text-cyan-400" : "text-white"
              }`
            }
          >
            <span className="text-2xl mb-1">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

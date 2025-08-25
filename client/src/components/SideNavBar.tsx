import { NavLink } from "react-router";
import { FaComments, FaUserAlt, FaCog } from "react-icons/fa";

export default function SideNavBar() {
  const navItems = [
    { id: "chats", label: "Chats", icon: <FaComments />, path: "/" },
    { id: "profile", label: "Profile", icon: <FaUserAlt />, path: "/profile" },
    { id: "settings", label: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  return (
    <div className="h-screen w-24 bg-gray-100 flex flex-col items-center py-4 ">
      {/* Profile */}
      <div className="flex flex-col items-center mb-8">
        <img
          src="https://via.placeholder.com/40"
          alt="profile"
          className="w-12 h-12 rounded-full"
        />
        <p className="text-xs mt-2">@emma95</p>
      </div>

      {/* Nav Items */}
      <div className="flex flex-col gap-6">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center text-sm ${
                isActive ? "text-emerald-600" : "text-gray-500"
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

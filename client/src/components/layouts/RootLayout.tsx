import { Outlet } from "react-router";
import SideNavBar from "../SideNavBar";

export default function RootLayout() {
  return (
    <div className="flex">
      <SideNavBar />

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}

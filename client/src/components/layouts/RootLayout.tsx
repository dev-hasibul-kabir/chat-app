import { Outlet } from "react-router";
import SideNavBar from "../SideNavBar";
import bgImage from "../../assets/images/root-layout-bg.png";

export default function RootLayout() {
  return (
    <div className="flex " style={{ backgroundImage: `url(${bgImage})` }}>
      <SideNavBar />

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}

import { Outlet, useNavigate } from "react-router";
import SideNavBar from "../SideNavBar";
import bgImage from "../../assets/images/root-layout-bg.png";
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect } from "react";

export default function RootLayout() {
  const navigate = useNavigate();
  const { fetchProfile, loading, user } = useAuthStore();

  useEffect(() => {
    if (!user) fetchProfile();
  }, []);
  if (loading) return <div>Loading</div>;
  if (!user) {
    navigate("/login", { replace: true });
  }

  return (
    <div className="flex" style={{ backgroundImage: `url(${bgImage})` }}>
      <SideNavBar />

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}

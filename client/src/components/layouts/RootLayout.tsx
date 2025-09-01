import { Outlet, useNavigate } from "react-router";
import SideNavBar from "../SideNavBar";
import bgImage from "../../assets/images/root-layout-bg.png";
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect } from "react";
import PaperPlaneLoader from "../PaperPlaneLoader";

export default function RootLayout() {
  const navigate = useNavigate();
  const { fetchProfile, user, requestStatus } = useAuthStore();
  const { loading } = requestStatus.fetchProfile;

  useEffect(() => {
    if (!user) fetchProfile();
  }, []);
  if (loading) return <PaperPlaneLoader />;

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

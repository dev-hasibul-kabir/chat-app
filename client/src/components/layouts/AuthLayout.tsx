import { Outlet, useNavigate } from "react-router";
import bgImage from "../../assets/images/bg-image.png";
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect } from "react";
import PaperPlaneLoader from "../PaperPlaneLoader";

export default function AuthLayout() {
  const navigate = useNavigate();
  const { fetchProfile, loading, user } = useAuthStore();

  useEffect(() => {
    if (!user) fetchProfile();
  }, []);
  if (loading) return <PaperPlaneLoader />;
  if (user) {
    navigate("/", { replace: true });
  }
  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Outlet />
    </div>
  );
}

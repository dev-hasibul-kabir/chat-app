import { Outlet } from "react-router";
import bgImage from "../../assets/images/bg-image.png";

export default function AuthLayout() {
  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div>
        <Outlet />
      </div>
    </div>
  );
}

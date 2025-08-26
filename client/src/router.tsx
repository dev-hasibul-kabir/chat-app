import { createBrowserRouter } from "react-router";
import RootLayout from "./components/layouts/RootLayout";
import AuthLayout from "./components/layouts/AuthLayout";
import Login from "./pages/login/page";
import Registration from "./pages/reistration/page";
import MessagePage from "./pages/home/page";

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { path: "/", Component: MessagePage },
      { path: "/profile", Component: () => <div>Profile</div> },
      { path: "/settings", Component: () => <div>Settings</div> },
    ],
  },
  {
    Component: AuthLayout,
    children: [
      { path: "/login", Component: Login },
      { path: "/register", Component: Registration },
    ],
  },
]);

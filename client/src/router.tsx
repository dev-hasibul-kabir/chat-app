import { createBrowserRouter } from "react-router";
import RootLayout from "./components/layouts/RootLayout";

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { path: "/", Component: () => <div>Home</div> },
      { path: "/profile", Component: () => <div>Profile</div> },
      { path: "/settings", Component: () => <div>Settings</div> },
    ],
  },
  {
    Component: () => <div>Auth Layout</div>,
    children: [
      { path: "/login", Component: () => <div className="mt-10">Login</div> },
      { path: "/register", Component: () => <div>Register</div> },
    ],
  },
]);

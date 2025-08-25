import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: () => <div>Default Layout</div>,
    children: [
      { path: "/", Component: () => <div>Home</div> },
      { path: "/profile", Component: () => <div>Profile</div> },
      { path: "/settigns", Component: () => <div>Settings</div> },
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

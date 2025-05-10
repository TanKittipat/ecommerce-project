import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import ProfilePage from "../pages/ProfilePage";
import SettingPage from "../pages/SettingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "settings", element: <SettingPage /> },
    ],
  },
]);

export default router;

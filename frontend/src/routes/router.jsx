import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import ProfilePage from "../pages/ProfilePage";
import SettingPage from "../pages/SettingPage";
import UserLoginRedirect from "./Redirect";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard";
import AddProduct from "../pages/Admin/Dashboard/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "shop", element: <Shop /> },
      {
        path: "cart",
        element: (
          <UserLoginRedirect>
            <Cart />
          </UserLoginRedirect>
        ),
      },
      {
        path: "profile",
        element: (
          <UserLoginRedirect>
            <ProfilePage />
          </UserLoginRedirect>
        ),
      },
      {
        path: "settings",
        element: (
          <UserLoginRedirect>
            <SettingPage />
          </UserLoginRedirect>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: <AdminLayout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "add-product", element: <AddProduct /> },
    ],
  },
]);

export default router;

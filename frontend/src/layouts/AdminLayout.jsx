import { Outlet } from "react-router";
import { isValidElement, useContext } from "react";
import logo from "/logo.png";
import "./main.css";
import { IoMdAdd } from "react-icons/io";
import { HiShoppingCart } from "react-icons/hi";
import { FaUser, FaShoppingBag } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import { MdSpatialTracking, MdSupportAgent } from "react-icons/md";
import { BiSolidDoorOpen } from "react-icons/bi";
import { AuthContext } from "../contexts/auth.context";

const AdminLayout = () => {
  const { logout } = useContext(AuthContext);
  const isAdmin = true;
  return (
    <div>
      {isAdmin ? (
        <div>
          <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center bg-base-300">
              {/* Page content here */}
              <Outlet />
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <li>
                  <a href="/dashboard" className="flex justify-start mb-3">
                    <img src={logo} alt="logo" className="w-20" />
                    <div className="badge badge-neutral">Admin</div>
                  </a>
                </li>
                <div class="relative flex py-5 items-center">
                  <div class="flex-grow border-t border-gray-400"></div>
                  <span class="flex-shrink mx-4 text-gray-400">Menu</span>
                  <div class="flex-grow border-t border-gray-400"></div>
                </div>
                <li>
                  <a href="/dashboard/add-product">
                    <IoMdAdd className="text-gray-700" />
                    Add Product
                  </a>
                </li>

                <li>
                  <a>
                    <FaShoppingBag className="text-gray-700" />
                    Manage Orders
                  </a>
                </li>
                <li>
                  <a href="/dashboard/manage-items">
                    <HiShoppingCart className="text-gray-700" />
                    Manage Items
                  </a>
                </li>
                <li>
                  <a href="/dashboard/all-users">
                    <FaUser className="text-gray-700" />
                    All Users
                  </a>
                </li>
                <div class="relative flex py-5 items-center">
                  <div class="flex-grow border-t border-gray-400"></div>
                  <span class="flex-shrink mx-4 text-gray-400">Menu</span>
                  <div class="flex-grow border-t border-gray-400"></div>
                </div>
                <li>
                  <a href="/">
                    <IoHome className="text-gray-700" />
                    Home
                  </a>
                </li>
                <li>
                  <a>
                    <AiFillProduct className="text-gray-700" />
                    Products
                  </a>
                </li>
                <li>
                  <a>
                    <MdSpatialTracking className="text-gray-700" />
                    Order Tracking
                  </a>
                </li>
                <li>
                  <a>
                    <MdSupportAgent className="text-gray-700" />
                    Customer Support
                  </a>
                </li>
                <div class="relative flex py-5 items-center">
                  <div class="flex-grow border-t border-gray-400"></div>
                  <span class="flex-shrink mx-4 text-gray-400">Menu</span>
                  <div class="flex-grow border-t border-gray-400"></div>
                </div>
                <li>
                  <button onClick={() => logout()}>
                    <BiSolidDoorOpen className="text-gray-700" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex justify-center object-center items-center text-2xl">
          You are not an Admin!
        </div>
      )}
    </div>
  );
};

export default AdminLayout;

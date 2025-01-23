import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import Profile from "./Profile";
import UserIcon from "./icons/UserIcon";
import Modal from "./Modal";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navItems = (
    <>
      <li>
        <a href="/">Home</a>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Category</summary>
          <ul>
            <li>
              <a href="/shop">All</a>
            </li>
            <li>
              <a href="/shop?category=clothing&itemsPerPage=8">Clothing</a>
            </li>
            <li>
              <a href="/shop?category=accessories&itemsPerPage=8">
                Accessories
              </a>
            </li>
            <li>
              <a href="/shop?category=gadgets&itemsPerPage=8">Gadgets</a>
            </li>
            <li>
              <a href="/shop?category=swag&itemsPerPage=8">Swag</a>
            </li>
          </ul>
        </details>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Service</summary>
          <ul>
            <li>
              <a href="">Order online</a>
            </li>
            <li>
              <a href="">Order tracking</a>
            </li>
          </ul>
        </details>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Promotions</summary>
          <ul>
            <li>
              <a href="">All</a>
            </li>
            <li>
              <a href="">Clothing</a>
            </li>
            <li>
              <a href="">Accessories</a>
            </li>
            <li>
              <a href="">Gadgets</a>
            </li>
            <li>
              <a href="">Swag</a>
            </li>
          </ul>
        </details>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <a href="/" className="btn btn-ghost font-semibold text-xl">
          SE Souvenirs
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end space-x-1">
        {/* Ternary operator */}
        {user ? (
          <Profile />
        ) : (
          <div className="space-x-2">
            <button
              onClick={() => document.getElementById("login").showModal()}
              className="btn bg-red text-white rounded-full px-5 flex items-center"
            >
              <UserIcon /> Login
            </button>
          </div>
        )}
      </div>
      <Modal name="login" />
    </div>
  );
};

export default Navbar;

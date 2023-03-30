import React from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { useSelector } from "react-redux";
import { clearAuth } from "../../containers/login/authSlice";
import { clearUserInfo } from "../../containers/login/userSlice";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import logo from "../../assets/logo.jpeg";
import { logout } from "../../firebase/firebaseClient";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

    const handleLogout = () => {
        dispatch(clearAuth());
        dispatch(clearUserInfo());
        localStorage.clear();
        navigate(user.id ? "/" : "/login");
        window.location.reload();
    };


  return (
    <nav className="stroke flex relative w-full h-[4rem] bg-white items-center text-center justify-between shadow-md">
      <div
        className="flex ml-5 h-full items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src={logo}
          alt="logo"
          className="object-cover h-10 w-10 rounded-lg "
        />
      </div>
      <ul className=" flex-row mr-5 lg:mr-[10rem] space-x-11 lg:flex hidden">
        <li>
          <Link to="/" className="">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/property">Property</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/pricing">Pricing</Link>
        </li>

        {user.id === null ? (
          <>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link onClick={handleLogout}>Logout</Link>
            </li>
            <li>
              <Link to={`user/${user.id}`}>
                {user.firstName} {user.lastName}
              </Link>
            </li>
          </>
        )}
      </ul>
      <div className="flex lg:hidden text-3xl mr-10">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <GiHamburgerMenu></GiHamburgerMenu>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Home
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/about"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      About
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/property"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Property
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/contact"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Contact
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/pricing"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Pricing
                    </Link>
                  )}
                </Menu.Item>

                {user.id === null ? (
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/signup"
                          className={classNames(
                            active
                              ? "bg-blue-300 text-gray-900"
                              : "text-gray-700 bg-blue-200",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Sign Up
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/login"
                          className={classNames(
                            active
                              ? "bg-green-300 text-gray-900"
                              : "text-gray-700 bg-green-200",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Login
                        </Link>
                      )}
                    </Menu.Item>
                  </>
                ) : (
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={`user/${user.id}`}
                          className={classNames(
                            active
                              ? "bg-blue-300 text-gray-900"
                              : "text-gray-700 bg-blue-200",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Account
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          onClick={handleLogout}
                          className={classNames(
                            active
                              ? "bg-red-500 text-gray-900"
                              : "text-gray-700 bg-red-400",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Log out
                        </Link>
                      )}
                    </Menu.Item>
                  </>
                )}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="fixed h-full"></div>
    </nav>
  );
};

export default Navbar;

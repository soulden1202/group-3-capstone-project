import React from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { useSelector } from "react-redux";
import { clearAuth } from "../../containers/login/authSlice";
import { clearUserInfo } from "../../containers/login/userSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    dispatch(clearAuth());
    dispatch(clearUserInfo());
    localStorage.clear();
  };

  return (
    <nav className="stroke flex relative w-full h-[4rem] bg-white items-center text-center justify-between shadow-md">
      <div className="ml-5">Livin It</div>
      <ul className=" flex-row mr-5 lg:mr-[10rem] space-x-11 md:flex hidden">
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
          <Link to="/contact">contact</Link>
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
      <div className="flex md:hidden text-3xl mr-10">
        <GiHamburgerMenu></GiHamburgerMenu>
      </div>
    </nav>
  );
};

export default Navbar;

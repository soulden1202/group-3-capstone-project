import React from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="stroke flex relative w-full h-[4rem] bg-white items-center text-center justify-between shadow-md">
      <div className="ml-5">Logo</div>
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
        <li>
          <Link to="/signup">Sign up</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
      <div class="flex md:hidden text-3xl mr-10">
        <GiHamburgerMenu></GiHamburgerMenu>
      </div>
    </nav>
  );
};

export default Navbar;

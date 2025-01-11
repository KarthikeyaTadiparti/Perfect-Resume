import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';

function Navbar() {

  return (
    <nav className="z-10 w-screen h-16 border-b-2 bg-white sticky top-0">
      <div className="flex w-4/5 mx-auto justify-between items-center">
        <h1 className="font-bold text-2xl tracking-wide mt-4">
          Perfect <span className="text-pri-blue">Resume</span>
        </h1>
        <div className="flex gap-x-12 font-medium mt-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/resume" className="hover:underline">Resume</Link>
          <Link to="*" className="hover:underline">About Us</Link>
          {/* {!currUser ? (
            <> */}
              <Link to="/auth/login" className="hover:underline">Log In</Link>
              <Link to="/auth/signup" className="hover:underline">Sign Up</Link>
            {/* </> */}
          {/* ) : ( */}
            <Link to="/user/logout" className="hover:underline">Log Out</Link>
          {/* )} */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

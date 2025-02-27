import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import axios from "axios";
import { handleSuccess } from "../lib/utils";

function Navbar() {
    const UserInfo = useSelector((state) => state.auth.UserInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/logout`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            // console.log("Logout successful:", response.data);
            handleSuccess(response.data.message);
            dispatch(logout());
            navigate("/");
        } catch (error) {
            console.log(error);
            let msg = error?.response?.data?.message;
            handleError(msg);
        }
    };

    return (
        <nav className="print:hidden z-10 h-16 border-b-2 bg-white sticky top-0">
            <div className="flex w-4/5 mx-auto justify-between items-center">
                <Link to="/">
                    <h1 className="font-bold text-2xl tracking-wide mt-4">
                        Perfect <span className="text-pri-blue">Resume</span>
                    </h1>
                </Link>

                <div className="flex gap-x-12 font-medium mt-4">
                    <Link to="/" className="hover:underline">
                        Home
                    </Link>
                    <Link to="/resume" className="hover:underline">
                        Resume
                    </Link>
                    <Link to="/aboutus" className="hover:underline">
                        About Us
                    </Link>
                    {!UserInfo ? (
                        <>
                            <Link to="/auth/login" className="hover:underline">
                                Log In
                            </Link>
                            <Link to="/auth/signup" className="hover:underline">
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="hover:underline"
                        >
                            Log Out
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { handleError } from "../utils/utils";

const PrivateRoute = () => {
    const UserInfo = useSelector((state) => state.auth.UserInfo);
    return UserInfo ? <Outlet /> : <Navigate to="/auth/login" replace />;
    // useEffect(() => {
    //     if (!UserInfo) {
    //         handleError("User must be logged in!");
    //     }
    // }, [UserInfo]);

    // if (!UserInfo) {
    //     return <Navigate to="/auth/login" replace />;
    // }

    // return <Outlet />;
};

export default PrivateRoute;

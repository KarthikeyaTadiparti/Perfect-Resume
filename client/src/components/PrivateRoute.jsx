import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ UserInfo }) {
    return UserInfo ? <Outlet /> : <Navigate to="/auth/login" replace />;
}

export default PrivateRoute;

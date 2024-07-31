import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../contexts/authContext";

const AdminGuard = () => {
    const { isAuthenticated, isAdmin } = useContext(AuthContext);

    if (isAuthenticated && !isAdmin) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default AdminGuard;
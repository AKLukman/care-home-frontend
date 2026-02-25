import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const AdminRoute = ( { children }: Props ) => {
    const user = useAppSelector( useCurrentUser );
    const location = useLocation();

    // Not logged in
    if ( !user ) {
        return (
            <Navigate
                to="/login"
                state={{ from: location.pathname }}
                replace
            />
        );
    }

    // Not admin
    if ( user.role !== "admin" && user.role !== "super_admin" ) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default AdminRoute;

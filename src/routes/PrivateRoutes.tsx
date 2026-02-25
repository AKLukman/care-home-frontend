import { Navigate, useLocation } from "react-router-dom"
import { useCurrentUser } from "../redux/features/auth/authSlice"
import { useAppSelector } from "../redux/hooks"
import type { ReactNode } from "react"

type Props = {
    children: ReactNode;
};

const PriavateRoutes = ( { children }: Props ) => {

    const user = useAppSelector( useCurrentUser )
    const location = useLocation()

    if ( !user ) {
        return <Navigate state={{ from: location?.pathname }} to="/login"></Navigate>
    }
    return children
}

export default PriavateRoutes
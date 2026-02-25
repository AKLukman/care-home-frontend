import { Navigate } from "react-router-dom"
import { useAppSelector } from "../redux/hooks"
import { useCurrentUser } from "../redux/features/auth/authSlice"
import type { ReactNode } from "react"

type Props = {
    children: ReactNode
}

const PublicRoute = ( { children }: Props ) => {
    const user = useAppSelector( useCurrentUser )

    if ( user ) {
        return <Navigate to="/" replace />
    }

    return children
}

export default PublicRoute

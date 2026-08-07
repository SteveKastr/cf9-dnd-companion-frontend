import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/context/AuthContext.ts"

type Role = "ADMIN" | "GAME_MASTER" | "PLAYER"

type RoleProtectedRouteProps = {
    allowedRoles: Role[]
}

const RoleProtectedRoute = ({ allowedRoles }: RoleProtectedRouteProps) => {
    const { role } = useAuth()

    if (!role || !allowedRoles.includes(role)) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}

export default RoleProtectedRoute
import { useAuth } from "@/context/AuthContext.ts"
import { Button } from "@/components/ui/button.tsx"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export function AuthButton() {
    const { isAuthenticated, logoutUser } = useAuth()
    const navigate = useNavigate()

    const handleLogin = () => {
        navigate("/login")
    }

    const handleLogout = () => {
        logoutUser()
        toast.success("Logged out!")
        navigate("/")
    }

    return isAuthenticated ? (
        <Button variant="default" onClick={handleLogout}>Logout</Button>
    ) : (
        <Button variant="secondary" onClick={handleLogin}>Login</Button>
    )
}
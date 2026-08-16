import { Link } from "react-router-dom"
import { LoginForm } from "@/components/LoginForm.tsx"

export default function LoginPage() {
    return (
        <div className="max-w-sm mx-auto p-8 space-y-6 border rounded bg-white shadow">
            <h1 className="text-2xl font-bold text-center">Login</h1>
            <LoginForm />
            <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="underline hover:text-foreground">
                    Register here
                </Link>
            </p>
        </div>
    )
}
import { Link } from "react-router-dom"
import { LoginForm } from "@/components/LoginForm.tsx"

export default function LoginPage() {
    return (
        <div className="relative min-h-screen">
            <div
                className="fixed inset-0 -z-10 bg-cover bg-center"
                style={{ backgroundImage: "url(/images/home-page-bg.jpg)" }}
            />

            <div className="max-w-sm mx-auto p-8 pt-16 space-y-6 border rounded bg-white shadow">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <LoginForm />
                <p className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/register" className="underline hover:text-foreground">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    )
}
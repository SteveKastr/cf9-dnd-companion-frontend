import { Link } from "react-router-dom"
import { LoginForm } from "@/components/LoginForm.tsx"
import { Card } from "@/components/ui/card.tsx"

export default function LoginPage() {
    return (
        <div className="relative min-h-screen">
            <div
                className="fixed inset-0 -z-10 bg-cover bg-center"
                style={{ backgroundImage: "url(/images/home-page-bg.jpg)" }}
            />

            <div className="max-w-sm mx-auto p-4 pt-16">
                <Card className="p-6 space-y-6">
                    <h1 className="text-2xl font-bold text-center">Login</h1>
                    <LoginForm />
                    <p className="text-center text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link to="/register" className="underline hover:text-foreground">
                            Register here
                        </Link>
                    </p>
                </Card>
            </div>
        </div>
    )
}
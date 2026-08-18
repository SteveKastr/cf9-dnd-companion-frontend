import { RegisterForm } from "@/components/RegisterForm.tsx"

export default function RegisterPage() {
    return (
        <div className="relative min-h-screen">
            <div
                className="fixed inset-0 -z-10 bg-cover bg-center"
                style={{ backgroundImage: "url(/images/home-page-bg.jpg)" }}
            />

            <div className="max-w-md mx-auto p-8 pt-16 space-y-6 border rounded bg-white shadow">
                <h1 className="text-2xl font-bold text-center">Register</h1>
                <RegisterForm />
            </div>
        </div>
    )
}
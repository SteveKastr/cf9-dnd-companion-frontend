import { RegisterForm } from "@/components/RegisterForm.tsx"

export default function RegisterPage() {
    return (
        <div className="max-w-md mx-auto p-8 space-y-6 border rounded bg-white shadow">
            <h1 className="text-2xl font-bold text-center">Register</h1>
            <RegisterForm />
        </div>
    )
}
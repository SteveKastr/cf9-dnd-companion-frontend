import { RegisterForm } from "@/components/RegisterForm.tsx"
import { Card } from "@/components/ui/card.tsx"

export default function RegisterPage() {
    return (
        <div className="relative min-h-screen">
            <div
                className="fixed inset-0 -z-10 bg-cover bg-center"
                style={{ backgroundImage: "url(/images/home-page-bg.jpg)" }}
            />

            <div className="max-w-md mx-auto p-4 pt-16">
                <Card className="p-6 space-y-6">
                    <h1 className="text-2xl font-bold text-center">Register</h1>
                    <RegisterForm />
                </Card>
            </div>
        </div>
    )
}
import { Field, FieldLabel } from "@/components/ui/field.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx"
import { useForm, useWatch } from "react-hook-form"
import { type RegisterFields, registerSchema } from "@/schemas/auth.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/context/AuthContext.ts"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils.ts"

export function RegisterForm() {
    const { registerUser } = useAuth()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFields>({
        resolver: zodResolver(registerSchema),
    })

    const selectedRole = useWatch({ control, name: "role" })

    const onSubmit = async (data: RegisterFields) => {
        try {
            await registerUser(data)
            toast.success("Registration successful")
            navigate("/")
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Registration failed")
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <Field>
                    <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                    <Input id="firstName" {...register("firstName")} />
                    {errors.firstName && (
                        <div className="text-red-600 text-sm">{errors.firstName.message}</div>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                    <Input id="lastName" {...register("lastName")} />
                    {errors.lastName && (
                        <div className="text-red-600 text-sm">{errors.lastName.message}</div>
                    )}
                </Field>
            </div>

            <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input id="username" {...register("username")} />
                {errors.username && (
                    <div className="text-red-600 text-sm">{errors.username.message}</div>
                )}
            </Field>

            <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" {...register("email")} />
                {errors.email && (
                    <div className="text-red-600 text-sm">{errors.email.message}</div>
                )}
            </Field>

            <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" type="password" {...register("password")} />
                {errors.password && (
                    <div className="text-red-600 text-sm">{errors.password.message}</div>
                )}
            </Field>

            <Field>
                <FieldLabel>Role</FieldLabel>
                <div className="grid grid-cols-2 gap-4">
                    <label
                        className={cn(
                            "cursor-pointer rounded-lg border-2 p-4 text-center transition-colors",
                            selectedRole === "GAME_MASTER"
                                ? "border-green-500 bg-green-100"
                                : "border-input hover:border-primary/50 hover:bg-accent"
                        )}
                    >
                        <input type="radio" value="GAME_MASTER" {...register("role")} className="sr-only" />
                        <div className="font-semibold">Game Master</div>
                        <div className="text-sm text-muted-foreground mt-1">
                            Run campaigns, manage monsters
                        </div>
                    </label>

                    <label
                        className={cn(
                            "cursor-pointer rounded-lg border-2 p-4 text-center transition-colors",
                            selectedRole === "PLAYER"
                                ? "border-green-500 bg-green-100"
                                : "border-input hover:border-primary/50 hover:bg-accent"
                        )}
                    >
                        <input type="radio" value="PLAYER" {...register("role")} className="sr-only" />
                        <div className="font-semibold">Player</div>
                        <div className="text-sm text-muted-foreground mt-1">
                            Create characters, explore the world
                        </div>
                    </label>
                </div>
                {errors.role && <div className="text-red-600 text-sm">{errors.role.message}</div>}
            </Field>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Register"}
            </Button>
        </form>
    )
}
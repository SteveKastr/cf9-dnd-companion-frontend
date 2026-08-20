import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getMyAccount, updateMyAccount, deleteMyAccount } from "@/api/account.ts"
import { Card } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Field, FieldLabel } from "@/components/ui/field.tsx"
import { Input } from "@/components/ui/input.tsx"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type UpdateAccountFormFields, updateAccountSchema } from "@/schemas/account.ts"
import { toast } from "sonner"
import { useAuth } from "@/context/AuthContext.ts"
import { useNavigate } from "react-router-dom"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog.tsx"
import { useEffect } from "react"

export default function MyAccountPage() {
    const { role, logoutUser } = useAuth()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { data: account, isLoading, error } = useQuery({
        queryKey: ["my-account"],
        queryFn: getMyAccount,
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<UpdateAccountFormFields>({
        resolver: zodResolver(updateAccountSchema),
    })

    useEffect(() => {
        if (account) {
            reset({
                firstName: account.firstName,
                lastName: account.lastName,
                email: account.email,
            })
        }
    }, [account, reset])

    const updateMutation = useMutation({
        mutationFn: updateMyAccount,
        onSuccess: () => {
            toast.success("Account updated")
            queryClient.invalidateQueries({ queryKey: ["my-account"] })
        },
        onError: (err) => {
            toast.error(err instanceof Error ? err.message : "Failed to update account")
        },
    })

    const deleteMutation = useMutation({
        mutationFn: deleteMyAccount,
        onSuccess: () => {
            toast.success("Account deleted")
            logoutUser()
            navigate("/")
        },
        onError: (err) => {
            toast.error(err instanceof Error ? err.message : "Failed to delete account")
        },
    })

    const onSubmit = (data: UpdateAccountFormFields) => {
        updateMutation.mutate(data)
    }

    if (isLoading) {
        return (
            <p className="p-4 inline-block bg-amber-50 text-red-800 font-semibold px-4 py-2 rounded-md">
                Loading account...
            </p>
        )
    }

    if (error || !account) {
        return (
            <p className="p-4 inline-block bg-amber-50 text-red-800 font-semibold px-4 py-2 rounded-md">
                Error: {error instanceof Error ? error.message : "Failed to load account"}
            </p>
        )
    }

    return (
        <div className="relative min-h-screen">
            <div
                className="fixed inset-0 -z-10 bg-cover bg-center"
                style={{ backgroundImage: "url(/images/users-bg.jpg)" }}
            />

            <div className="p-4 max-w-md mx-auto space-y-6">
                <h1 className="text-2xl font-bold inline-block bg-amber-50 text-red-800 px-4 py-2 rounded-md">
                    My Account
                </h1>

                <Card className="p-6 space-y-4">
                    <div className="text-sm space-y-1">
                        <p><span className="font-semibold">Username:</span> {account.username}</p>
                        <p><span className="font-semibold">Role:</span> {account.role}</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input id="email" type="email" {...register("email")} />
                            {errors.email && (
                                <div className="text-red-600 text-sm">{errors.email.message}</div>
                            )}
                        </Field>

                        <Button type="submit" className="w-full" disabled={isSubmitting || !isDirty}>
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </form>
                </Card>

                {role !== "ADMIN" && (
                    <Card className="p-6 space-y-1 flex flex-col items-center justify-center text-center min-h-20">
                        <h2 className="font-semibold text-red-800 text-lg">Danger Zone</h2>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="w-full text-base">
                                    Delete My Account
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure you want to delete your account?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your account.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => deleteMutation.mutate()}>
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </Card>
                )}
            </div>
        </div>
    )
}
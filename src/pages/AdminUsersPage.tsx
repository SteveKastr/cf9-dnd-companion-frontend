import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getUsers, deleteUser } from "@/api/users.ts"
import { Card } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"
import { toast } from "sonner"
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

export default function AdminUsersPage() {
    const queryClient = useQueryClient()

    const { data: users, isLoading, error } = useQuery({
        queryKey: ["admin-users"],
        queryFn: getUsers,
    })

    const deleteMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            toast.success("User deleted")
            queryClient.invalidateQueries({ queryKey: ["admin-users"] })
        },
        onError: (err) => {
            toast.error(err instanceof Error ? err.message : "Failed to delete user")
        },
    })

    if (isLoading) {
        return (
            <p className="p-4 inline-block bg-amber-50 text-red-800 font-semibold px-4 py-2 rounded-md">
                Loading users...
            </p>
        )
    }

    if (error || !users) {
        return (
            <p className="p-4 inline-block bg-amber-50 text-red-800 font-semibold px-4 py-2 rounded-md">
                Error: {error instanceof Error ? error.message : "Failed to load users"}
            </p>
        )
    }

    return (
        <div className="relative min-h-screen">
            <div
                className="fixed inset-0 -z-10 bg-cover bg-center"
                style={{ backgroundImage: "url(/images/users-bg.jpg)" }}
            />
            <div className="p-4 max-w-3xl mx-auto space-y-4">
                <h1 className="text-2xl font-bold mb-4 inline-block bg-amber-50 text-red-800 px-4 py-2 rounded-md">Users</h1>

                {users.map((user) => (
                    <Card key={user.id} className="p-4 flex flex-row items-center justify-between gap-4">
                        <div className="text-left">
                            <p className="font-semibold">{user.username}</p>
                            <p className="text-sm text-muted-foreground">
                                {user.firstName} {user.lastName} — {user.email}
                            </p>
                            <p className="text-sm">{user.role}</p>
                        </div>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">Delete</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Do you want to delete user with username: "{user.username}"?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the user account.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => deleteMutation.mutate(user.id)}>
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </Card>
                ))}
            </div>
        </div>
    )
}
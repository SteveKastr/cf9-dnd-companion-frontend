import { apiFetch } from "@/api/client.ts"
import type { User } from "@/types/user.ts"

export async function getUsers(): Promise<User[]> {
    return apiFetch("/admin/users")
}

export async function deleteUser(id: string): Promise<void> {
    return apiFetch(`/admin/users/${id}`, { method: "DELETE" })
}
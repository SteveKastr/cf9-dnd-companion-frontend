import { apiFetch } from "@/api/client.ts"
import type { Account, UpdateAccountFields } from "@/types/account.ts"

export async function getMyAccount(): Promise<Account> {
    return apiFetch("/account")
}

export async function updateMyAccount(fields: UpdateAccountFields): Promise<Account> {
    return apiFetch("/account", {
        method: "PUT",
        body: JSON.stringify(fields),
    })
}

export async function deleteMyAccount(): Promise<void> {
    return apiFetch("/account", { method: "DELETE" })
}
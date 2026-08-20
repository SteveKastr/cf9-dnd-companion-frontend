import type { User } from "@/types/user.ts"

export type UpdateAccountFields = {
    firstName: string
    lastName: string
    email: string
}

export type Account = User
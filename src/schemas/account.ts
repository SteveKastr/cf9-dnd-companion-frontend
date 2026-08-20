import { z } from "zod"

export const updateAccountSchema = z.object({
    firstName: z.string().min(1, { error: "First name is required" }),
    lastName: z.string().min(1, { error: "Last name is required" }),
    email: z.string().email({ error: "Email must be valid" }),
})

export type UpdateAccountFormFields = z.infer<typeof updateAccountSchema>
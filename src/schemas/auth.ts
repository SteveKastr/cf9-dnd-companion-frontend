import { z } from "zod"

export const loginSchema = z.object({
    username: z.string().min(1, { error: "Username is required" }),
    password: z.string().min(1, { error: "Password is required" }),
})
export type LoginFields = z.infer<typeof loginSchema>

export const registerSchema = z.object({
    firstName: z.string().min(1, { error: "First name is required" }),
    lastName: z.string().min(1, { error: "Last name is required" }),
    username: z
        .string()
        .min(3, { error: "Username must be at least 3 characters" })
        .max(30, { error: "Username must be at most 30 characters" }),
    email: z.string().email({ error: "Email must be valid" }),
    password: z
        .string()
        .min(8, { error: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, { error: "Password must contain an uppercase letter" })
        .regex(/[0-9]/, { error: "Password must contain a number" })
        .regex(/[!@#$%&]/, { error: "Password must contain a special character (!@#$%&)" }),
    role: z.enum(["GAME_MASTER", "PLAYER"], { error: "Role is required" }),
})
export type RegisterFields = z.infer<typeof registerSchema>

export type AuthResponse = {
    token: string
    username: string
    role: "ADMIN" | "GAME_MASTER" | "PLAYER"
}
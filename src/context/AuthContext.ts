import { createContext, useContext } from "react"
import type { LoginFields, RegisterFields } from "@/schemas/auth.ts"

type Role = "ADMIN" | "GAME_MASTER" | "PLAYER"

export type AuthContextProps = {
    isAuthenticated: boolean
    accessToken: string | null
    username: string | null
    role: Role | null
    loginUser: (fields: LoginFields) => Promise<void>
    registerUser: (fields: RegisterFields) => Promise<void>
    logoutUser: () => void
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
    return ctx
}
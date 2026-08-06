import { useState } from "react"
import { jwtDecode } from "jwt-decode"
import { deleteCookie, getCookie, setCookie } from "@/utils/cookies.ts"
import { login, register } from "@/api/auth.ts"
import { AuthContext } from "@/context/AuthContext.ts"
import type { LoginFields, RegisterFields, AuthResponse } from "@/schemas/auth.ts"

type Role = "ADMIN" | "GAME_MASTER" | "PLAYER"
type JwtPayload = { sub: string; role: Role }

function readPayloadFromToken(token: string | null): { username: string | null; role: Role | null } {
    if (!token) return { username: null, role: null }
    try {
        const decoded = jwtDecode<JwtPayload>(token)
        return { username: decoded.sub ?? null, role: decoded.role ?? null }
    } catch {
        return { username: null, role: null }
    }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const cookieAccessToken = getCookie("access_token")
    const initialPayload = readPayloadFromToken(cookieAccessToken ?? null)

    const [accessToken, setAccessToken] = useState<string | null>(() => cookieAccessToken ?? null)
    const [username, setUsername] = useState<string | null>(initialPayload.username)
    const [role, setRole] = useState<Role | null>(initialPayload.role)

    const applyAuthResponse = (res: AuthResponse) => {
        setCookie("access_token", res.token, { expires: 1, sameSite: "Lax", secure: false, path: "/" })
        setAccessToken(res.token)
        setUsername(res.username)
        setRole(res.role)
    }

    const loginUser = async (fields: LoginFields) => {
        const res = await login(fields)
        applyAuthResponse(res)
    }

    const registerUser = async (fields: RegisterFields) => {
        const res = await register(fields)
        applyAuthResponse(res)
    }

    const logoutUser = () => {
        deleteCookie("access_token")
        setAccessToken(null)
        setUsername(null)
        setRole(null)
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated: !!accessToken, accessToken, username, role, loginUser, registerUser, logoutUser }}
        >
            {children}
        </AuthContext.Provider>
    )
}
import type { LoginFields, RegisterFields, AuthResponse } from "@/schemas/auth.ts"

const API_URL = import.meta.env.VITE_API_URL

/**
 * Uses its own fetch logic (not the shared apiFetch helper) because
 * register's error handling needs to surface multiple validation
 * messages (the "details" array from MethodArgumentNotValidException),
 * which apiFetch doesn't currently support.
 */

export async function login({ username, password }: LoginFields): Promise<AuthResponse> {
    const res = await fetch(API_URL + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    })

    if (!res.ok) {
        let message = "Login failed"
        try {
            const data = await res.json()
            if (typeof data?.message === "string") message = data.message
        } catch (error) {
            console.error("Error parsing login response", error)
        }
        throw new Error(message)
    }

    return await res.json()
}

export async function register(fields: RegisterFields): Promise<AuthResponse> {
    const res = await fetch(API_URL + "/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
    })

    if (!res.ok) {
        let message = "Registration failed"
        try {
            const data = await res.json()
            if (typeof data?.message === "string") message = data.message
            else if (Array.isArray(data?.details) && data.details.length > 0) {
                message = data.details.join(", ")
            }
        } catch (error) {
            console.error("Error parsing register response", error)
        }
        throw new Error(message)
    }

    return await res.json()
}
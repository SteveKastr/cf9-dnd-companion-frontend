import { getCookie } from "@/utils/cookies.ts"

const API_URL = import.meta.env.VITE_API_URL

/**
 * Central fetch wrapper used by all api/*.ts files. Automatically attaches
 * the JWT bearer token (if present), parses backend error messages into
 * a consistent Error, and handles 204 No Content responses (e.g. DELETE)
 * which have no JSON body to parse.
 */

export async function apiFetch<T = unknown>(path: string, options: RequestInit = {}): Promise<T> {
    const token = getCookie("access_token")

    const res = await fetch(API_URL + path, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    })

    if (!res.ok) {
        let message = "Request failed"
        try {
            const data = await res.json()
            if (typeof data?.message === "string") message = data.message
        } catch (error) {
            console.error("Error parsing error response", error)
        }
        throw new Error(message)
    }

    if (res.status === 204) {
        return undefined as T
    }

    return res.json()
}
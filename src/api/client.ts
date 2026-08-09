import { getCookie } from "@/utils/cookies.ts"

const API_URL = import.meta.env.VITE_API_URL

export async function apiFetch(path: string, options: RequestInit = {}) {
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

    return res.json()
}
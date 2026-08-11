import { apiFetch } from "@/api/client.ts"
import type { Background } from "@/types/background.ts"

export async function getBackgrounds(): Promise<Background[]> {
    return apiFetch("/backgrounds")
}
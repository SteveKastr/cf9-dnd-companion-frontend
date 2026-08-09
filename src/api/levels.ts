import { apiFetch } from "@/api/client.ts"
import type { Level } from "@/types/level.ts"

export async function getLevelsByClassName(className: string): Promise<Level[]> {
    return apiFetch(`/levels?className=${encodeURIComponent(className)}`)
}
import { apiFetch } from "@/api/client.ts"
import type { Subrace } from "@/types/subrace.ts"

export async function getSubraceByIndex(index: string): Promise<Subrace> {
    return apiFetch(`/subraces/${index}`)
}
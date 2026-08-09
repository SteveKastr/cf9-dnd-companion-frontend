import { apiFetch } from "@/api/client.ts"
import type { Subclass } from "@/types/subclass.ts"

export async function getSubclassByIndex(index: string): Promise<Subclass> {
    return apiFetch(`/subclasses/${index}`)
}
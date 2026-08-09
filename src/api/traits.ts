import { apiFetch } from "@/api/client.ts"
import type { Trait } from "@/types/trait.ts"

export async function getTraitByIndex(index: string): Promise<Trait> {
    return apiFetch(`/traits/${index}`)
}
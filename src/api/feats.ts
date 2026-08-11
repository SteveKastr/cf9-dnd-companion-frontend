import { apiFetch } from "@/api/client.ts"
import type { Feat } from "@/types/feat.ts"

export async function getFeats(): Promise<Feat[]> {
    return apiFetch("/feats")
}
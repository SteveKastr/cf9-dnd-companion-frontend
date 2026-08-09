import { apiFetch } from "@/api/client.ts"
import type { Feature } from "@/types/feature.ts"

export async function getFeatureByIndex(index: string): Promise<Feature> {
    return apiFetch(`/features/${index}`)
}
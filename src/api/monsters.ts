import { apiFetch } from "@/api/client.ts"
import type { Monster } from "@/types/monster.ts"
import type { PagedResponse } from "@/types/common.ts"

export async function getMonsters(
    page: number,
    size: number = 20,
    type?: string,
    challengeRating?: number,
    search?: string
): Promise<PagedResponse<Monster>> {
    const params = new URLSearchParams({ page: String(page), size: String(size) })
    if (type) params.set("type", type)
    if (challengeRating !== undefined) params.set("challengeRating", String(challengeRating))
    if (search) params.set("search", search)

    return apiFetch(`/monsters?${params.toString()}`)
}

export async function getMonsterByIndex(index: string): Promise<Monster> {
    return apiFetch(`/monsters/${index}`)
}
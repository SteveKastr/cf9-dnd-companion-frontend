import { apiFetch } from "@/api/client.ts"
import type { Monster } from "@/types/monster.ts"
import type { PagedResponse } from "@/types/common.ts"

export async function getMonsters(page: number, size: number = 20): Promise<PagedResponse<Monster>> {
    return apiFetch(`/monsters?page=${page}&size=${size}`)
}

export async function getMonsterByIndex(index: string): Promise<Monster> {
    return apiFetch(`/monsters/${index}`)
}
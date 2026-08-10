import { apiFetch } from "@/api/client.ts"
import type { Spell, PagedResponse } from "@/types/spell.ts"

export async function getSpells(page: number, size: number = 20): Promise<PagedResponse<Spell>> {
    return apiFetch(`/spells?page=${page}&size=${size}`)
}

export async function getSpellByIndex(index: string): Promise<Spell> {
    return apiFetch(`/spells/${index}`)
}

export async function getSpellsByLevel(level: number): Promise<Spell[]> {
    return apiFetch(`/spells/level/${level}`)
}
import { apiFetch } from "@/api/client.ts"
import type { Spell } from "@/types/spell.ts"
import type { PagedResponse } from "@/types/common.ts"

export async function getSpells(
    page: number,
    size: number = 20,
    level?: number,
    className?: string
): Promise<PagedResponse<Spell>> {
    const params = new URLSearchParams({ page: String(page), size: String(size) })
    if (level !== undefined) params.set("level", String(level))
    if (className) params.set("className", className)

    return apiFetch(`/spells?${params.toString()}`)
}

export async function getSpellByIndex(index: string): Promise<Spell> {
    return apiFetch(`/spells/${index}`)
}
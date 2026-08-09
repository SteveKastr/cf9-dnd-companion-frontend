import { apiFetch } from "@/api/client.ts"
import type { CharacterClass } from "@/types/characterClass.ts"

export async function getClasses(): Promise<CharacterClass[]> {
    return apiFetch("/classes")
}

export async function getClassByIndex(index: string): Promise<CharacterClass> {
    return apiFetch(`/classes/${index}`)
}
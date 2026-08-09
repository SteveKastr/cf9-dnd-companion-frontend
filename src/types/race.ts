import type { ApiReference } from "@/types/common.ts"

export type AbilityBonus = {
    abilityScore: ApiReference
    bonus: number
}

export type Race = {
    id: string
    index: string
    name: string
    speed: number
    abilityBonuses: AbilityBonus[]
    abilityBonusOptions: unknown | null
    alignment: string
    age: string
    size: string
    sizeDescription: string
    startingProficiencies: ApiReference[] | null
    startingProficiencyOptions: unknown | null
    languages: ApiReference[]
    languageDesc: string
    languageOptions: unknown | null
    traits: ApiReference[]
    subraces: ApiReference[]
    url: string
}
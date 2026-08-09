import type { ApiReference } from "@/types/common.ts"

export type LevelSpellcasting = {
    cantripsKnown?: number
    spellSlotsLevel1: number
    spellSlotsLevel2: number
    spellSlotsLevel3: number
    spellSlotsLevel4: number
    spellSlotsLevel5: number
    spellSlotsLevel6?: number
    spellSlotsLevel7?: number
    spellSlotsLevel8?: number
    spellSlotsLevel9?: number
    spellsKnown?: number
}

export type Level = {
    id: string
    index: string
    level: number
    abilityScoreBonuses?: number
    profBonus?: number
    features: ApiReference[]
    class: ApiReference
    classSpecific: Record<string, unknown> | null
    spellcasting: LevelSpellcasting | null
    subclass: ApiReference | null
    subclassSpecific: Record<string, unknown> | null
    url: string
}
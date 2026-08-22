import type { ApiReference } from "@/types/common.ts"

/**
 * NOTE: spell_slots_level_X fields use snake_case (not camelCase) because
 * the backend's Level.classSpecific/LevelSpellcasting are typed with
 * explicit @JsonProperty annotations that don't follow the usual
 * camelCase API convention — see backend Level.java for details.
 */

export type LevelSpellcasting = {
    cantripsKnown?: number
    spell_slots_level_1: number
    spell_slots_level_2: number
    spell_slots_level_3: number
    spell_slots_level_4: number
    spell_slots_level_5: number
    spell_slots_level_6?: number
    spell_slots_level_7?: number
    spell_slots_level_8?: number
    spell_slots_level_9?: number
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
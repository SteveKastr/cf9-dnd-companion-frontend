import type { ApiReference } from "@/types/common.ts"

export type StartingEquipment = {
    equipment: ApiReference
    quantity: number
}

export type SpellcastingInfo = {
    name: string
    desc: string[]
}

export type Spellcasting = {
    level: number
    spellcastingAbility: ApiReference
    info: SpellcastingInfo[]
}

export type CharacterClass = {
    id: string
    index: string
    name: string
    hitDie: number
    classLevels: string
    proficiencies: ApiReference[] | null
    savingThrows: ApiReference[] | null
    startingEquipment: StartingEquipment[] | null
    subclasses: ApiReference[]
    spellcasting: Spellcasting | null
    spells: string | null
    url: string
    proficiencyChoices: unknown[] | null
    startingEquipmentOptions: unknown[] | null
    multiClassing: MultiClassing | null
}

export type MultiClassingPrerequisite = {
    abilityScore: ApiReference
    minimumScore: number
}

export type MultiClassing = {
    prerequisites: MultiClassingPrerequisite[] | null
    prerequisiteOptions: unknown | null
    proficiencies: ApiReference[] | null
    proficiencyChoices: unknown[] | null
}
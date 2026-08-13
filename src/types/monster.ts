import type { ApiReference } from "@/types/common.ts"

export type ArmorClassEntry = {
    type: string
    value: number
    armor?: ApiReference[]
    condition?: ApiReference
    spell?: ApiReference
    desc?: string
}

export type Speed = {
    walk?: string
    burrow?: string
    climb?: string
    fly?: string
    swim?: string
    hover?: boolean
}

export type Senses = {
    passivePerception: number
    blindsight?: string
    darkvision?: string
    tremorsense?: string
    truesight?: string
}

export type ProficiencyEntry = {
    value: number
    proficiency: ApiReference
}

export type ActionDamage = {
    damage_type?: ApiReference
    damage_dice?: string
}

export type ActionDC = {
    dc_type: ApiReference
    dc_value?: number
    success_type: string
}

export type MonsterAction = {
    name: string
    desc: string
    attack_bonus?: number
    dc?: ActionDC
    damage?: ActionDamage[]
    multiattack_type?: string
    usage?: { type: string; dice?: string; min_value?: number; times?: number }
}

export type Monster = {
    id: string
    index: string
    name: string
    desc?: string
    size: string
    type: string
    subtype?: string
    alignment: string
    armorClass: ArmorClassEntry[]
    hitPoints: number
    hitDice: string
    hitPointsRoll?: string
    speed: Speed
    strength: number
    dexterity: number
    constitution: number
    intelligence: number
    wisdom: number
    charisma: number
    proficiencies?: ProficiencyEntry[]
    damageVulnerabilities?: string[]
    damageResistances?: string[]
    damageImmunities?: string[]
    conditionImmunities?: ApiReference[]
    senses: Senses
    languages: string
    challengeRating: number
    proficiencyBonus?: number
    xp: number
    specialAbilities?: MonsterAction[]
    actions?: MonsterAction[]
    legendaryActions?: MonsterAction[]
    reactions?: MonsterAction[]
    image?: string
    url: string
}
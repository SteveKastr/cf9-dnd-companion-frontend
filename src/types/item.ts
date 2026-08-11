import type { ApiReference } from "@/types/common.ts"

export type ArmorClass = {
    base: number
    dexBonus: boolean
    maxBonus?: number
}

export type Damage = {
    damageType: ApiReference
    damageDice: string
}

export type Range = {
    normal: number
    long?: number
}

export type Rarity = {
    name: string
}

export type Item = {
    id: string
    index: string
    name: string
    equipmentCategory: ApiReference
    cost?: { quantity: number; unit: string }
    desc?: string[]
    weight?: number
    image?: string
    gearCategory?: ApiReference
    armorCategory?: string
    armorClass?: ArmorClass
    weaponCategory?: string
    weaponRange?: string
    damage?: Damage
    properties?: ApiReference[]
    range?: Range
    itemType: string
    rarity?: Rarity
    variants?: ApiReference[]
    variant?: boolean
    url: string
}
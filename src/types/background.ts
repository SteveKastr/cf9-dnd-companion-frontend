import type { ApiReference } from "@/types/common.ts"

export type StartingEquipmentEntry = {
    equipment: ApiReference
    quantity: number
}

export type BackgroundFeature = {
    name: string
    desc: string[]
}

export type Background = {
    id: string
    index: string
    name: string
    startingProficiencies: ApiReference[]
    startingEquipment?: StartingEquipmentEntry[]
    startingGold?: { quantity: number; unit: string }
    feature?: BackgroundFeature
    url: string
}
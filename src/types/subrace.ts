import type { AbilityBonus } from "@/types/race.ts"
import type { ApiReference } from "@/types/common.ts"

export type Subrace = {
    id: string
    index: string
    name: string
    race: ApiReference
    desc: string
    abilityBonuses: AbilityBonus[]
    racialTraits: ApiReference[]
    url: string
}
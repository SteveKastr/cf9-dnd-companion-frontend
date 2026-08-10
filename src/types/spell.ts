import type { ApiReference } from "@/types/common.ts"

export type SpellDamage = {
    damageType?: ApiReference
    damageAtSlotLevel?: Record<string, string>
    damageAtCharacterLevel?: Record<string, string>
}

export type SpellDC = {
    dcType: ApiReference
    dcSuccess: string
    desc?: string
}

export type AreaOfEffect = {
    size: number
    type: string
}

export type Spell = {
    id: string
    index: string
    name: string
    desc: string[]
    higherLevel?: string[]
    range: string
    components: string[]
    material?: string
    ritual: boolean
    duration: string
    concentration: boolean
    castingTime: string
    level: number
    attackType?: string
    damage?: SpellDamage
    dc?: SpellDC
    areaOfEffect?: AreaOfEffect
    healAtSlotLevel?: Record<string, string>
    school: ApiReference
    classes: ApiReference[]
    subclasses?: ApiReference[]
    url: string
}

export type PagedResponse<T> = {
    content: T[]
    page: {
        size: number
        number: number
        totalElements: number
        totalPages: number
    }
}
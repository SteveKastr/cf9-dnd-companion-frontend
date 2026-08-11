import type { ApiReference } from "@/types/common.ts"

export type FeatPrerequisite = {
    abilityScore?: ApiReference
    minimumScore: number
}

export type Feat = {
    id: string
    index: string
    name: string
    prerequisites?: FeatPrerequisite[]
    desc: string[]
    url: string
}
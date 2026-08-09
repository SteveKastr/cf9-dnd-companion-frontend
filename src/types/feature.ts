import type { ApiReference } from "@/types/common.ts"

export type Feature = {
    id: string
    index: string
    name: string
    level: number
    characterClass?: ApiReference
    subclass?: ApiReference
    desc: string[]
    url: string
}
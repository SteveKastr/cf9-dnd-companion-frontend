import type { ApiReference } from "@/types/common.ts"

export type Rule = {
    id: string
    index: string
    name: string
    desc: string
    subsections: ApiReference[]
    url: string
}
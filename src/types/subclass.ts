import type { ApiReference } from "@/types/common.ts"

export type Subclass = {
    id: string
    index: string
    name: string
    class: ApiReference
    subclassFlavor: string
    desc: string[]
    subclassLevels: string
    url: string
}
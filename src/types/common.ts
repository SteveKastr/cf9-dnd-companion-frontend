export type ApiReference = {
    index: string
    name: string
    url: string
    note?: string | null
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
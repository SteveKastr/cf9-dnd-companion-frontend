import { apiFetch } from "@/api/client.ts"
import type { Item } from "@/types/item.ts"
import type { PagedResponse } from "@/types/common.ts"

export async function getItems(
    page: number,
    size: number = 20,
    category?: string,
    itemType?: string
): Promise<PagedResponse<Item>> {
    const params = new URLSearchParams({ page: String(page), size: String(size) })
    if (category) params.set("category", category)
    if (itemType) params.set("itemType", itemType)

    return apiFetch(`/items?${params.toString()}`)
}

export async function getItemByIndex(index: string): Promise<Item> {
    return apiFetch(`/items/${index}`)
}
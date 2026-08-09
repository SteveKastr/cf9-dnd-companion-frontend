import { apiFetch } from "@/api/client.ts"
import type { Race } from "@/types/race.ts"

export async function getRaces(): Promise<Race[]> {
    return apiFetch("/races")
}
export async function getRaceByIndex(index: string): Promise<Race> {
    return apiFetch(`/races/${index}`)
}
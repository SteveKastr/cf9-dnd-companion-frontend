import { apiFetch } from "@/api/client.ts"
import type { Rule } from "@/types/rule.ts"

export async function getRules(): Promise<Rule[]> {
    return apiFetch("/rules")
}

export async function getRuleByIndex(index: string): Promise<Rule> {
    return apiFetch(`/rules/${index}`)
}
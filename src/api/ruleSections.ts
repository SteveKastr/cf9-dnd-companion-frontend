import { apiFetch } from "@/api/client.ts"
import type { RuleSection } from "@/types/ruleSection.ts"

export async function getRuleSectionByIndex(index: string): Promise<RuleSection> {
    return apiFetch(`/rule-sections/${index}`)
}
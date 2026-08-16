import { useParams, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getMonsterByIndex } from "@/api/monsters.ts"
import { Card } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"
import type { MonsterAction } from "@/types/monster.ts"

export default function MonsterDetailPage() {
    const { monsterIndex } = useParams<{ monsterIndex: string }>()
    const navigate = useNavigate()

    const { data: monster, isLoading, error } = useQuery({
        queryKey: ["monsters", monsterIndex],
        queryFn: () => getMonsterByIndex(monsterIndex!),
        enabled: !!monsterIndex,
    })

    if (isLoading) {
        return <p className="p-4">Loading monster...</p>
    }

    if (error || !monster) {
        return (
            <p className="p-4 text-red-600">
                Error: {error instanceof Error ? error.message : "Monster not found"}
            </p>
        )
    }

    const speedText = Object.entries(monster.speed)
        .filter(([, v]) => v !== undefined && v !== null && v !== false)
        .map(([k, v]) => (k === "hover" ? "(hover)" : `${k} ${v}`))
        .join(", ")

    return (
        <div className="relative min-h-screen">
            <div
                className="fixed inset-0 -z-10 bg-cover bg-center"
                style={{ backgroundImage: "url(/images/monsters-bg.jpg)" }}
            />
            <div className="p-4 max-w-3xl mx-auto space-y-6">
                <Button variant="secondary" onClick={() => navigate(-1)}>
                    &larr; Back
                </Button>

                <Card className="p-6 space-y-4">
                    <div>
                        <h1 className="text-3xl font-bold">{monster.name}</h1>
                        <p className="text-sm text-muted-foreground italic">
                            {monster.size} {monster.type}
                            {monster.subtype ? ` (${monster.subtype})` : ""}, {monster.alignment}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <p>
                            <span className="font-semibold">Armor Class:</span>{" "}
                            {monster.armorClass.map((ac) => `${ac.value} (${ac.type})`).join(", ")}
                        </p>
                        <p>
                            <span className="font-semibold">Hit Points:</span> {monster.hitPoints} ({monster.hitDice})
                        </p>
                        <p>
                            <span className="font-semibold">Speed:</span> {speedText}
                        </p>
                        <p>
                            <span className="font-semibold">Challenge Rating:</span> {monster.challengeRating} ({monster.xp} XP)
                        </p>
                    </div>

                    <div className="grid grid-cols-6 gap-2 text-center text-sm">
                        <div>
                            <p className="font-semibold">STR</p>
                            <p>{monster.strength} ({formatModifier(monster.strength)})</p>
                        </div>
                        <div>
                            <p className="font-semibold">DEX</p>
                            <p>{monster.dexterity} ({formatModifier(monster.dexterity)})</p>
                        </div>
                        <div>
                            <p className="font-semibold">CON</p>
                            <p>{monster.constitution} ({formatModifier(monster.constitution)})</p>
                        </div>
                        <div>
                            <p className="font-semibold">INT</p>
                            <p>{monster.intelligence} ({formatModifier(monster.intelligence)})</p>
                        </div>
                        <div>
                            <p className="font-semibold">WIS</p>
                            <p>{monster.wisdom} ({formatModifier(monster.wisdom)})</p>
                        </div>
                        <div>
                            <p className="font-semibold">CHA</p>
                            <p>{monster.charisma} ({formatModifier(monster.charisma)})</p>
                        </div>
                    </div>

                    {monster.damageVulnerabilities && monster.damageVulnerabilities.length > 0 && (
                        <p className="text-sm">
                            <span className="font-semibold">Damage Vulnerabilities:</span>{" "}
                            {monster.damageVulnerabilities.join(", ")}
                        </p>
                    )}

                    {monster.damageResistances && monster.damageResistances.length > 0 && (
                        <p className="text-sm">
                            <span className="font-semibold">Damage Resistances:</span>{" "}
                            {monster.damageResistances.join(", ")}
                        </p>
                    )}

                    {monster.damageImmunities && monster.damageImmunities.length > 0 && (
                        <p className="text-sm">
                            <span className="font-semibold">Damage Immunities:</span>{" "}
                            {monster.damageImmunities.join(", ")}
                        </p>
                    )}

                    {monster.conditionImmunities && monster.conditionImmunities.length > 0 && (
                        <p className="text-sm">
                            <span className="font-semibold">Condition Immunities:</span>{" "}
                            {monster.conditionImmunities.map((c) => c.name).join(", ")}
                        </p>
                    )}

                    <div className="text-sm">
                        <span className="font-semibold">Senses:</span>{" "}
                        {[
                            monster.senses.darkvision && `darkvision ${monster.senses.darkvision}`,
                            monster.senses.blindsight && `blindsight ${monster.senses.blindsight}`,
                            monster.senses.tremorsense && `tremorsense ${monster.senses.tremorsense}`,
                            monster.senses.truesight && `truesight ${monster.senses.truesight}`,
                            `passive Perception ${monster.senses.passivePerception}`,
                        ]
                            .filter(Boolean)
                            .join(", ")}
                    </div>

                    <p className="text-sm">
                        <span className="font-semibold">Languages:</span> {monster.languages || "-"}
                    </p>

                    {monster.proficiencies && monster.proficiencies.length > 0 && (
                        <p className="text-sm">
                            <span className="font-semibold">Proficiencies:</span>{" "}
                            {monster.proficiencies
                                .map((p) => `${p.proficiency.name.replace(/^(Skill|Saving Throw):\s*/, "")} +${p.value}`)
                                .join(", ")}
                        </p>
                    )}

                    {monster.specialAbilities && monster.specialAbilities.length > 0 && (
                        <div>
                            <h2 className="font-semibold mb-2">Special Abilities</h2>
                            <ActionsList actions={monster.specialAbilities} />
                        </div>
                    )}

                    {monster.actions && monster.actions.length > 0 && (
                        <div>
                            <h2 className="font-semibold mb-2">Actions</h2>
                            <ActionsList actions={monster.actions} />
                        </div>
                    )}

                    {monster.reactions && monster.reactions.length > 0 && (
                        <div>
                            <h2 className="font-semibold mb-2">Reactions</h2>
                            <ActionsList actions={monster.reactions} />
                        </div>
                    )}

                    {monster.legendaryActions && monster.legendaryActions.length > 0 && (
                        <div>
                            <h2 className="font-semibold mb-2">Legendary Actions</h2>
                            <ActionsList actions={monster.legendaryActions} />
                        </div>
                    )}
                </Card>
            </div>
        </div>
    )
}

function formatModifier(score: number): string {
    const mod = Math.floor((score - 10) / 2)
    return mod >= 0 ? `+${mod}` : `${mod}`
}

function formatUsage(usage: MonsterAction["usage"]): string {
    if (!usage) return ""

    if (usage.type === "recharge on roll" && usage.dice && usage.min_value !== undefined) {
        const maxRoll = Number(usage.dice.replace(/^\d*d/, ""))
        return usage.min_value === maxRoll
            ? ` (Recharge ${usage.min_value})`
            : ` (Recharge ${usage.min_value}-${maxRoll})`
    }

    if (usage.times) {
        return ` (${usage.type} ${usage.times})`
    }

    return ` (${usage.type})`
}

function ActionsList({ actions }: { actions: MonsterAction[] }) {
    return (
        <div className="space-y-3">
            {actions.map((action, i) => (
                <div key={i} className="text-sm">
                    <p className="font-medium">
                        {action.name}
                        {formatUsage(action.usage)}
                    </p>
                    <p>{action.desc}</p>
                </div>
            ))}
        </div>
    )
}
import { useParams, Link } from "react-router-dom"
import { useQuery, useQueries } from "@tanstack/react-query"
import { getClassByIndex } from "@/api/classes.ts"
import { getSubclassByIndex } from "@/api/subclasses.ts"
import { getLevelsByClassName } from "@/api/levels.ts"
import { getFeatureByIndex } from "@/api/features.ts"
import { Card } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"

export default function ClassDetailPage() {
    const { classIndex } = useParams<{ classIndex: string }>()

    const { data: characterClass, isLoading, error } = useQuery({
        queryKey: ["classes", classIndex],
        queryFn: () => getClassByIndex(classIndex!),
        enabled: !!classIndex,
    })

    if (isLoading) {
        return <p className="p-4">Loading class...</p>
    }

    if (error || !characterClass) {
        return (
            <p className="p-4 text-red-600">
                Error: {error instanceof Error ? error.message : "Class not found"}
            </p>
        )
    }

    return (
        <div className="p-4 max-w-3xl mx-auto space-y-6">
            <Link to="/classes">
                <Button variant="secondary">&larr; Back to Classes</Button>
            </Link>

            <Card className="p-6 space-y-4">
                <h1 className="text-3xl font-bold">{characterClass.name}</h1>

                <p className="text-sm">
                    <span className="font-semibold">Hit Die:</span> d{characterClass.hitDie}
                </p>

                {characterClass.savingThrows && characterClass.savingThrows.length > 0 && (
                    <div>
                        <h2 className="font-semibold mb-2">Saving Throws</h2>
                        <p className="text-sm">
                            {characterClass.savingThrows.map((st) => st.name).join(", ")}
                        </p>
                    </div>
                )}

                {characterClass.proficiencies && characterClass.proficiencies.length > 0 && (
                    <div>
                        <h2 className="font-semibold mb-2">Proficiencies</h2>
                        <ul className="list-disc list-inside text-sm">
                            {characterClass.proficiencies.map((p) => (
                                <li key={p.index}>{p.name}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {characterClass.proficiencyChoices && characterClass.proficiencyChoices.length > 0 && (
                    <div>
                        <h2 className="font-semibold mb-2">Proficiency Choices</h2>
                        {characterClass.proficiencyChoices.map((choice, i) => (
                            <ChoiceText key={i} choice={choice} />
                        ))}
                    </div>
                )}

                {characterClass.startingEquipment && characterClass.startingEquipment.length > 0 && (
                    <div>
                        <h2 className="font-semibold mb-2">Starting Equipment</h2>
                        <ul className="list-disc list-inside text-sm">
                            {characterClass.startingEquipment.map((se, i) => (
                                <li key={i}>
                                    {se.equipment.name} x{se.quantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {characterClass.startingEquipmentOptions && characterClass.startingEquipmentOptions.length > 0 && (
                    <div>
                        <h2 className="font-semibold mb-2">Additional Equipment Choices</h2>
                        {characterClass.startingEquipmentOptions.map((choice, i) => (
                            <ChoiceText key={i} choice={choice} />
                        ))}
                    </div>
                )}

                {characterClass.multiClassing && (
                    <div>
                        <h2 className="font-semibold mb-2">Multi-Classing</h2>

                        {characterClass.multiClassing.prerequisites &&
                            characterClass.multiClassing.prerequisites.length > 0 && (
                                <p className="text-sm">
                                    Requires:{" "}
                                    {characterClass.multiClassing.prerequisites
                                        .map((p) => `${p.abilityScore.name} ${p.minimumScore}+`)
                                        .join(", ")}
                                </p>
                            )}

                        {characterClass.multiClassing.proficiencies &&
                            characterClass.multiClassing.proficiencies.length > 0 && (
                                <p className="text-sm">
                                    Grants proficiency:{" "}
                                    {characterClass.multiClassing.proficiencies.map((p) => p.name).join(", ")}
                                </p>
                            )}

                        {characterClass.multiClassing.proficiencyChoices?.map((choice, i) => (
                            <ChoiceText key={i} choice={choice} />
                        ))}
                    </div>
                )}

                {characterClass.spellcasting && (
                    <div>
                        <h2 className="font-semibold mb-2">Spellcasting</h2>
                        <p className="text-sm">
                            <span className="font-medium">Ability:</span>{" "}
                            {characterClass.spellcasting.spellcastingAbility.name}
                        </p>
                        {characterClass.spellcasting.info.map((info, i) => (
                            <div key={i} className="mt-2">
                                <p className="text-sm font-medium">{info.name}</p>
                                <p className="text-sm text-muted-foreground">{info.desc.join(" ")}</p>
                            </div>
                        ))}
                    </div>
                )}

                {characterClass.subclasses.length > 0 && (
                    <div>
                        <h2 className="font-semibold mb-2">Subclasses</h2>
                        <SubclassesList subclassIndexes={characterClass.subclasses.map((s) => s.index)} />
                    </div>
                )}

                <div>
                    <h2 className="font-semibold mb-2">Class Features by Level</h2>
                    <LevelsList className={characterClass.name} />
                </div>
            </Card>
        </div>
    )
}

function SubclassesList({ subclassIndexes }: { subclassIndexes: string[] }) {
    const subclassQueries = useQueries({
        queries: subclassIndexes.map((index) => ({
            queryKey: ["subclasses", index],
            queryFn: () => getSubclassByIndex(index),
        })),
    })

    return (
        <div className="space-y-4">
            {subclassQueries.map((query, i) => {
                if (query.isLoading) {
                    return <p key={i} className="text-sm text-muted-foreground">Loading subclass...</p>
                }
                if (query.error || !query.data) {
                    return null
                }
                const subclass = query.data
                return (
                    <div key={subclass.index} className="border-l-2 pl-3 space-y-1">
                        <h3 className="font-semibold">{subclass.name}</h3>
                        <p className="text-sm text-muted-foreground italic">{subclass.subclassFlavor}</p>
                        <p className="text-sm">{subclass.desc.join(" ")}</p>
                    </div>
                )
            })}
        </div>
    )
}

function LevelsList({ className }: { className: string }) {
    const { data: levels, isLoading, error } = useQuery({
        queryKey: ["levels", className],
        queryFn: () => getLevelsByClassName(className),
    })

    if (isLoading) {
        return <p className="text-sm text-muted-foreground">Loading levels...</p>
    }

    if (error || !levels) {
        return null
    }

    return (
        <div className="space-y-4">
            {levels
                .sort((a, b) => a.level - b.level)
                .map((lvl) => (
                    <div key={lvl.index} className="border-l-2 pl-3 space-y-1">
                        <h3 className="font-semibold">Level {lvl.level}</h3>

                        {lvl.features.length > 0 && (
                            <FeaturesList featureIndexes={lvl.features.map((f) => f.index)} />
                        )}

                        {lvl.classSpecific && Object.keys(lvl.classSpecific).length > 0 && (
                            <ClassSpecificText data={lvl.classSpecific} />
                        )}
                    </div>
                ))}
        </div>
    )
}

function FeaturesList({ featureIndexes }: { featureIndexes: string[] }) {
    const featureQueries = useQueries({
        queries: featureIndexes.map((index) => ({
            queryKey: ["features", index],
            queryFn: () => getFeatureByIndex(index),
        })),
    })

    return (
        <div className="space-y-2">
            {featureQueries.map((query, i) => {
                if (query.isLoading) {
                    return <p key={i} className="text-sm text-muted-foreground">Loading feature...</p>
                }
                if (query.error || !query.data) {
                    return null
                }
                return (
                    <div key={query.data.index} className="text-sm">
                        <span className="font-medium">{query.data.name}:</span>{" "}
                        {query.data.desc.join(" ")}
                    </div>
                )
            })}
        </div>
    )
}

function formatKey(key: string): string {
    return key
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
}

function ClassSpecificText({ data }: { data: Record<string, unknown> }) {
    const entries = Object.entries(data).filter(([, value]) => value !== 0 && value !== null)

    if (entries.length === 0) return null

    return (
        <p className="text-sm text-muted-foreground">
            {entries.map(([key, value]) => `${formatKey(key)}: ${String(value)}`).join(" · ")}
        </p>
    )
}

type RawOptionItem = {
    option_type?: string
    item?: { name?: string }
    count?: number
    of?: { name?: string }
    items?: RawOptionItem[]
    choice?: RawChoice
}

type RawChoiceFrom = {
    options?: RawOptionItem[]
    equipment_category?: { name?: string }
}

type RawChoice = {
    desc?: string
    choose?: number
    from?: RawChoiceFrom
}

function describeOption(opt: RawOptionItem): string {
    if (opt.option_type === "reference" && opt.item?.name) {
        return opt.item.name.replace(/^Skill:\s*/, "")
    }
    if (opt.option_type === "counted_reference" && opt.of?.name) {
        return `${opt.count ?? ""} x ${opt.of.name}`.trim()
    }
    if (opt.option_type === "multiple" && opt.items) {
        return opt.items.map(describeOption).join(" and ")
    }
    if (opt.option_type === "choice" && opt.choice) {
        return describeChoice(opt.choice)
    }
    return opt.item?.name ?? ""
}

function describeChoice(c: RawChoice): string {
    if (c.desc) {
        return c.desc
    }

    if (c.from?.equipment_category?.name) {
        return `any ${c.from.equipment_category.name}`
    }

    const options = c.from?.options?.map(describeOption).filter(Boolean) ?? []
    return options.join(", ")
}

function ChoiceText({ choice }: { choice: unknown }) {
    const c = choice as RawChoice
    const text = describeChoice(c)

    if (!text) return null

    return (
        <p className="text-sm">
            {c.choose && c.choose > 1 ? `Choose ${c.choose}: ` : ""}
            {text}
        </p>
    )
}
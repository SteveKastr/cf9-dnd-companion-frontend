import { useParams, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getSpellByIndex } from "@/api/spells.ts"
import { Card } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"

export default function SpellDetailPage() {
    const { spellIndex } = useParams<{ spellIndex: string }>()
    const navigate = useNavigate()

    const { data: spell, isLoading, error } = useQuery({
        queryKey: ["spells", spellIndex],
        queryFn: () => getSpellByIndex(spellIndex!),
        enabled: !!spellIndex,
    })

    if (isLoading) {
        return (
            <p className="p-4 inline-block bg-amber-50 text-red-800 font-semibold px-4 py-2 rounded-md">
                Loading spell...
            </p>
        )
    }

    if (error || !spell) {
        return (
            <p className="p-4 inline-block bg-amber-50 text-red-800 font-semibold px-4 py-2 rounded-md">
                Error: {error instanceof Error ? error.message : "Spell not found"}
            </p>
        )
    }

    return (
        <div className="relative min-h-screen">
            <div
                className="fixed inset-0 -z-10 bg-cover bg-center"
                style={{ backgroundImage: "url(/images/spells-bg.jpg)" }}
            />

            <div className="p-4 max-w-3xl mx-auto space-y-6">
                <Button variant="secondary" onClick={() => navigate(-1)}>
                    &larr; Back
                </Button>

                <Card className="p-6 space-y-4">
                    <div>
                        <h1 className="text-3xl font-bold">{spell.name}</h1>
                        <p className="text-sm text-muted-foreground italic">
                            Level {spell.level} — {spell.school.name}
                            {spell.ritual ? " (Ritual)" : ""}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <p><span className="font-semibold">Casting Time:</span> {spell.castingTime}</p>
                        <p><span className="font-semibold">Range:</span> {spell.range}</p>
                        <p><span className="font-semibold">Components:</span> {spell.components.join(", ")}</p>
                        <p><span className="font-semibold">Duration:</span> {spell.duration}</p>
                    </div>

                    {spell.material && (
                        <p className="text-sm">
                            <span className="font-semibold">Material:</span> {spell.material}
                        </p>
                    )}

                    {spell.concentration && (
                        <p className="text-sm font-medium text-amber-600">Requires Concentration</p>
                    )}

                    <div>
                        <h2 className="font-semibold mb-2">Description</h2>
                        <div className="text-sm space-y-2">
                            {spell.desc.map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))}
                        </div>
                    </div>

                    {spell.higherLevel && spell.higherLevel.length > 0 && (
                        <div>
                            <h2 className="font-semibold mb-2">At Higher Levels</h2>
                            <div className="text-sm space-y-2">
                                {spell.higherLevel.map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    )}

                    {spell.areaOfEffect && (
                        <p className="text-sm">
                            <span className="font-semibold">Area of Effect:</span>{" "}
                            {spell.areaOfEffect.size} ft. {spell.areaOfEffect.type}
                        </p>
                    )}

                    {spell.dc && (
                        <p className="text-sm">
                            <span className="font-semibold">Saving Throw:</span> {spell.dc.dcType.name}
                            {spell.dc.desc ? ` — ${spell.dc.desc}` : ""}
                        </p>
                    )}

                    {spell.damage?.damageType && (
                        <p className="text-sm">
                            <span className="font-semibold">Damage Type:</span> {spell.damage.damageType.name}
                        </p>
                    )}

                    <div>
                        <h2 className="font-semibold mb-2">Classes</h2>
                        <p className="text-sm">{spell.classes.map((c) => c.name).join(", ")}</p>
                    </div>
                </Card>
            </div>
        </div>
    )
}
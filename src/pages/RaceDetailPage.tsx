import { useParams, useNavigate } from "react-router-dom"
import { useQuery, useQueries } from "@tanstack/react-query"
import { getRaceByIndex } from "@/api/races.ts"
import { getTraitByIndex } from "@/api/traits.ts"
import { Card } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"
import { getSubraceByIndex } from "@/api/subraces.ts"

export default function RaceDetailPage() {
    const { raceIndex } = useParams<{ raceIndex: string }>()
    const navigate = useNavigate()

    const { data: race, isLoading, error } = useQuery({
        queryKey: ["races", raceIndex],
        queryFn: () => getRaceByIndex(raceIndex!),
        enabled: !!raceIndex,
    })

    if (isLoading) {
        return (
            <p className="p-4 inline-block bg-amber-50 text-red-800 font-semibold px-4 py-2 rounded-md">
                Loading race...
            </p>
        )
    }

    if (error || !race) {
        return (
            <p className="p-4 inline-block bg-amber-50 text-red-800 font-semibold px-4 py-2 rounded-md">
                Error: {error instanceof Error ? error.message : "Race not found"}
            </p>
        )
    }

    return (
        <div className="relative min-h-screen">
            <div
                className="fixed inset-0 -z-10 bg-cover bg-center"
                style={{ backgroundImage: "url(/images/races-bg.jpg)" }}
            />
            <div className="p-4 max-w-3xl mx-auto space-y-6">
                <Button variant="secondary" onClick={() => navigate(-1)}>
                    &larr; Back
                </Button>

                <Card className="p-6 space-y-4">
                    <h1 className="text-3xl font-bold">{race.name}</h1>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <p><span className="font-semibold">Size:</span> {race.size}</p>
                        <p><span className="font-semibold">Speed:</span> {race.speed} ft.</p>
                        <p><span className="font-semibold">Age:</span> {race.age}</p>
                        <p><span className="font-semibold">Alignment:</span> {race.alignment}</p>
                    </div>

                    <div>
                        <h2 className="font-semibold mb-2">Ability Bonuses</h2>
                        <ul className="list-disc list-inside text-sm">
                            {race.abilityBonuses.map((bonus, i) => (
                                <li key={i}>
                                    {bonus.abilityScore.name} +{bonus.bonus}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-semibold mb-2">Languages</h2>
                        <p className="text-sm">{race.languageDesc}</p>
                    </div>

                    {race.traits.length > 0 && (
                        <div>
                            <h2 className="font-semibold mb-2">Traits</h2>
                            <TraitsList traitIndexes={race.traits.map((t) => t.index)} />
                        </div>
                    )}

                    {race.subraces.length > 0 && (
                        <div>
                            <h2 className="font-semibold mb-2">Subraces</h2>
                            <SubracesList subraceIndexes={race.subraces.map((s) => s.index)} />
                        </div>
                    )}
                </Card>
            </div>
        </div>
    )
}

function TraitsList({ traitIndexes }: { traitIndexes: string[] }) {
    const traitQueries = useQueries({
        queries: traitIndexes.map((index) => ({
            queryKey: ["traits", index],
            queryFn: () => getTraitByIndex(index),
        })),
    })

    return (
        <div className="space-y-3">
            {traitQueries.map((query, i) => {
                if (query.isLoading) {
                    return (
                        <p key={i} className="text-sm text-muted-foreground">
                            Loading trait...
                        </p>
                    )
                }
                if (query.error || !query.data) {
                    return null
                }
                return (
                    <div key={query.data.index} className="text-sm">
                        <span className="font-semibold">{query.data.name}:</span>{" "}
                        {query.data.desc.join(" ")}
                    </div>
                )
            })}
        </div>
    )
}
function SubracesList({ subraceIndexes }: { subraceIndexes: string[] }) {
    const subraceQueries = useQueries({
        queries: subraceIndexes.map((index) => ({
            queryKey: ["subraces", index],
            queryFn: () => getSubraceByIndex(index),
        })),
    })

    return (
        <div className="space-y-4">
            {subraceQueries.map((query, i) => {
                if (query.isLoading) {
                    return <p key={i} className="text-sm text-muted-foreground">Loading subrace...</p>
                }
                if (query.error || !query.data) {
                    return null
                }
                const subrace = query.data
                return (
                    <div key={subrace.index} className="border-l-2 pl-3 space-y-2">
                        <h3 className="font-semibold">{subrace.name}</h3>
                        <p className="text-sm text-muted-foreground">{subrace.desc}</p>

                        {subrace.abilityBonuses.length > 0 && (
                            <div className="text-sm">
                                <span className="font-medium">Ability Bonuses: </span>
                                {subrace.abilityBonuses
                                    .map((b) => `${b.abilityScore.name} +${b.bonus}`)
                                    .join(", ")}
                            </div>
                        )}

                        {subrace.racialTraits.length > 0 && (
                            <TraitsList traitIndexes={subrace.racialTraits.map((t) => t.index)} />
                        )}
                    </div>
                )
            })}
        </div>
    )
}
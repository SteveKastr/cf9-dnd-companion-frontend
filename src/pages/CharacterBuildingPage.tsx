import { useQuery } from "@tanstack/react-query"
import { getBackgrounds } from "@/api/backgrounds.ts"
import { getFeats } from "@/api/feats.ts"
import { Card } from "@/components/ui/card.tsx"

export default function CharacterBuildingPage() {
    const { data: backgrounds, isLoading: loadingBackgrounds } = useQuery({
        queryKey: ["backgrounds"],
        queryFn: getBackgrounds,
    })

    const { data: feats, isLoading: loadingFeats } = useQuery({
        queryKey: ["feats"],
        queryFn: getFeats,
    })

    return (
        <div className="relative min-h-screen">
            <div
                className="fixed inset-0 -z-10 bg-cover bg-center"
                style={{ backgroundImage: "url(/images/backgrounds-feats-bg.jpg)" }}
            />
            <div className="p-4 max-w-3xl mx-auto space-y-8">
                <h1 className="text-2xl font-bold inline-block bg-amber-50 text-red-800 px-4 py-2 rounded-md">Backgrounds & Feats</h1>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Backgrounds</h2>
                    {loadingBackgrounds && <p className="text-sm text-muted-foreground">Loading...</p>}
                    {backgrounds?.map((bg) => (
                        <Card key={bg.id} className="p-6 space-y-3">
                            <h3 className="text-lg font-semibold">{bg.name}</h3>

                            {bg.startingProficiencies.length > 0 && (
                                <p className="text-sm">
                                    <span className="font-semibold">Starting Proficiencies:</span>{" "}
                                    {bg.startingProficiencies.map((p) => p.name).join(", ")}
                                </p>
                            )}

                            {bg.startingEquipment && bg.startingEquipment.length > 0 && (
                                <div className="text-sm">
                                    <span className="font-semibold">Starting Equipment:</span>
                                    <ul className="list-disc list-inside">
                                        {bg.startingEquipment.map((se, i) => (
                                            <li key={i}>
                                                {se.equipment.name} x{se.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {bg.startingGold && (
                                <p className="text-sm">
                                    <span className="font-semibold">Starting Gold:</span>{" "}
                                    {bg.startingGold.quantity} {bg.startingGold.unit}
                                </p>
                            )}

                            {bg.feature && (
                                <div className="text-sm">
                                    <span className="font-semibold">Feature — {bg.feature.name}:</span>{" "}
                                    {bg.feature.desc.join(" ")}
                                </div>
                            )}
                        </Card>
                    ))}
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Feats</h2>
                    {loadingFeats && <p className="text-sm text-muted-foreground">Loading...</p>}
                    {feats?.map((feat) => (
                        <Card key={feat.id} className="p-6 space-y-3">
                            <h3 className="text-lg font-semibold">{feat.name}</h3>

                            {feat.prerequisites && feat.prerequisites.length > 0 && (
                                <p className="text-sm">
                                    <span className="font-semibold">Prerequisites:</span>{" "}
                                    {feat.prerequisites
                                        .map((p) => `${p.abilityScore?.name ?? ""} ${p.minimumScore}+`.trim())
                                        .join(", ")}
                                </p>
                            )}

                            <div className="text-sm space-y-2">
                                {feat.desc.map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                ))}
                            </div>
                        </Card>
                    ))}
                </section>
            </div>
        </div>
    )
}
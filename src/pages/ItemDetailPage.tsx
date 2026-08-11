import { useParams, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getItemByIndex } from "@/api/items.ts"
import { Card } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"

export default function ItemDetailPage() {
    const { itemIndex } = useParams<{ itemIndex: string }>()
    const navigate = useNavigate()

    const { data: item, isLoading, error } = useQuery({
        queryKey: ["items", itemIndex],
        queryFn: () => getItemByIndex(itemIndex!),
        enabled: !!itemIndex,
    })

    if (isLoading) {
        return <p className="p-4">Loading item...</p>
    }

    if (error || !item) {
        return (
            <p className="p-4 text-red-600">
                Error: {error instanceof Error ? error.message : "Item not found"}
            </p>
        )
    }

    return (
        <div className="p-4 max-w-3xl mx-auto space-y-6">
            <Button variant="secondary" onClick={() => navigate(-1)}>
                &larr; Back
            </Button>

            <Card className="p-6 space-y-4">
                <div>
                    <h1 className="text-3xl font-bold">{item.name}</h1>
                    <p className="text-sm text-muted-foreground">
                        {item.equipmentCategory.name}
                        {item.itemType === "magic" && item.rarity ? ` — ${item.rarity.name}` : ""}
                    </p>
                </div>

                {item.cost && (
                    <p className="text-sm">
                        <span className="font-semibold">Cost:</span> {item.cost.quantity} {item.cost.unit}
                    </p>
                )}

                {item.weight !== undefined && (
                    <p className="text-sm">
                        <span className="font-semibold">Weight:</span> {item.weight} lb.
                    </p>
                )}

                {item.weaponCategory && (
                    <p className="text-sm">
                        <span className="font-semibold">Weapon Category:</span> {item.weaponCategory}
                        {item.weaponRange ? ` (${item.weaponRange})` : ""}
                    </p>
                )}

                {item.damage && (
                    <p className="text-sm">
                        <span className="font-semibold">Damage:</span> {item.damage.damageDice}{" "}
                        {item.damage.damageType.name}
                    </p>
                )}

                {item.range && (
                    <p className="text-sm">
                        <span className="font-semibold">Range:</span> {item.range.normal}
                        {item.range.long ? ` / ${item.range.long}` : ""} ft.
                    </p>
                )}

                {item.properties && item.properties.length > 0 && (
                    <p className="text-sm">
                        <span className="font-semibold">Properties:</span>{" "}
                        {item.properties.map((p) => p.name).join(", ")}
                    </p>
                )}

                {item.armorCategory && (
                    <p className="text-sm">
                        <span className="font-semibold">Armor Category:</span> {item.armorCategory}
                    </p>
                )}

                {item.armorClass && (
                    <p className="text-sm">
                        <span className="font-semibold">Armor Class:</span> {item.armorClass.base}
                        {item.armorClass.dexBonus ? " + Dex modifier" : ""}
                        {item.armorClass.maxBonus ? ` (max ${item.armorClass.maxBonus})` : ""}
                    </p>
                )}

                {item.desc && item.desc.length > 0 && (
                    <div>
                        <h2 className="font-semibold mb-2">Description</h2>
                        <div className="text-sm space-y-2">
                            {item.desc.map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                )}

                {item.variants && item.variants.length > 0 && (
                    <div>
                        <h2 className="font-semibold mb-2">Variants</h2>
                        <p className="text-sm">{item.variants.map((v) => v.name).join(", ")}</p>
                    </div>
                )}
            </Card>
        </div>
    )
}
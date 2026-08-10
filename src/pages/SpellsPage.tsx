import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getSpells } from "@/api/spells.ts"
import { Card } from "@/components/ui/card.tsx"
import { Link } from "react-router-dom"
import { PaginationControls } from "@/components/PaginationControls.tsx"

export default function SpellsPage() {
    const [currentPage, setCurrentPage] = useState(0)

    const { data, isLoading, error } = useQuery({
        queryKey: ["spells", currentPage],
        queryFn: () => getSpells(currentPage),
    })

    if (isLoading) {
        return <p className="p-4">Loading spells...</p>
    }

    if (error || !data) {
        return (
            <p className="p-4 text-red-600">
                Error: {error instanceof Error ? error.message : "Failed to load spells"}
            </p>
        )
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Spells</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.content.map((spell) => (
                    <Link key={spell.id} to={`/spells/${spell.index}`}>
                        <Card className="p-4 space-y-2 cursor-pointer hover:border-primary/50 hover:bg-accent transition-colors h-full">
                            <h2 className="text-xl font-semibold">{spell.name}</h2>
                            <p className="text-sm text-muted-foreground">
                                Level {spell.level} — {spell.school.name}
                            </p>
                            <p className="text-sm">{spell.castingTime}</p>
                        </Card>
                    </Link>
                ))}
            </div>

            <PaginationControls
                currentPage={data.page.number}
                totalPages={data.page.totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}
import { useSearchParams, Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getMonsters } from "@/api/monsters.ts"
import { Card } from "@/components/ui/card.tsx"
import { PaginationControls } from "@/components/PaginationControls.tsx"

export default function MonstersPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const currentPage = Number(searchParams.get("page") ?? "0")

    const { data, isLoading, error } = useQuery({
        queryKey: ["monsters", currentPage],
        queryFn: () => getMonsters(currentPage),
    })

    const handlePageChange = (page: number) => {
        const next = new URLSearchParams(searchParams)
        next.set("page", String(page))
        setSearchParams(next)
    }

    if (isLoading) {
        return <p className="p-4">Loading monsters...</p>
    }

    if (error || !data) {
        return (
            <p className="p-4 text-red-600">
                Error: {error instanceof Error ? error.message : "Failed to load monsters"}
            </p>
        )
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Monsters</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.content.map((monster) => (
                    <Link key={monster.id} to={`/monsters/${monster.index}`}>
                        <Card className="p-4 space-y-2 cursor-pointer hover:border-primary/50 hover:bg-accent transition-colors h-full">
                            <h2 className="text-xl font-semibold">{monster.name}</h2>
                            <p className="text-sm text-muted-foreground">
                                {monster.size} {monster.type}
                            </p>
                            <p className="text-sm">CR {monster.challengeRating} — {monster.xp} XP</p>
                        </Card>
                    </Link>
                ))}
            </div>

            <PaginationControls
                currentPage={data.page.number}
                totalPages={data.page.totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    )
}
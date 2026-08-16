import { useSearchParams, Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getMonsters } from "@/api/monsters.ts"
import { Card } from "@/components/ui/card.tsx"
import { PaginationControls } from "@/components/PaginationControls.tsx"
import { Input } from "@/components/ui/input.tsx"

const MONSTER_TYPES = [
    "aberration", "beast", "celestial", "construct", "dragon", "elemental",
    "fey", "fiend", "giant", "humanoid", "monstrosity", "ooze", "plant", "undead",
]

const CHALLENGE_RATINGS = [
    { value: "0", label: "0" },
    { value: "0.125", label: "1/8" },
    { value: "0.25", label: "1/4" },
    { value: "0.5", label: "1/2" },
    ...Array.from({ length: 30 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) })),
]

export default function MonstersPage() {
    const [searchParams, setSearchParams] = useSearchParams()

    const currentPage = Number(searchParams.get("page") ?? "0")
    const typeFilter = searchParams.get("type") ?? ""
    const crFilter = searchParams.get("cr") ?? ""
    const searchFilter = searchParams.get("search") ?? ""

    const { data, isLoading, error } = useQuery({
        queryKey: ["monsters", currentPage, typeFilter, crFilter, searchFilter],
        queryFn: () =>
            getMonsters(
                currentPage,
                18,
                typeFilter || undefined,
                crFilter === "" ? undefined : Number(crFilter),
                searchFilter || undefined
            ),
    })

    const updateParams = (updates: Record<string, string>) => {
        const next = new URLSearchParams(searchParams)
        Object.entries(updates).forEach(([key, value]) => {
            if (value === "") {
                next.delete(key)
            } else {
                next.set(key, value)
            }
        })
        setSearchParams(next)
    }

    const handleTypeChange = (value: string) => {
        updateParams({ type: value, page: "0" })
    }

    const handleCrChange = (value: string) => {
        updateParams({ cr: value, page: "0" })
    }

    const handleSearchChange = (value: string) => {
        updateParams({ search: value, page: "0" })
    }

    const handlePageChange = (page: number) => {
        updateParams({ page: String(page) })
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Monsters</h1>

            <div className="flex flex-wrap gap-4 mb-6">
                <Input
                    placeholder="Search by name..."
                    value={searchFilter}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="max-w-xs"
                />

                <select
                    value={typeFilter}
                    onChange={(e) => handleTypeChange(e.target.value)}
                    className="rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                >
                    <option value="">All Types</option>
                    {MONSTER_TYPES.map((t) => (
                        <option key={t} value={t}>
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </option>
                    ))}
                </select>

                <select
                    value={crFilter}
                    onChange={(e) => handleCrChange(e.target.value)}
                    className="rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                >
                    <option value="">All Challenge Ratings</option>
                    {CHALLENGE_RATINGS.map((cr) => (
                        <option key={cr.value} value={cr.value}>
                            CR {cr.label}
                        </option>
                    ))}
                </select>
            </div>

            {isLoading && <p>Loading monsters...</p>}

            {error && (
                <p className="text-red-600">
                    Error: {error instanceof Error ? error.message : "Failed to load monsters"}
                </p>
            )}

            {data && (
                <>
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

                    {data.content.length === 0 && (
                        <p className="text-muted-foreground">No monsters found matching these filters.</p>
                    )}

                    <PaginationControls
                        currentPage={data.page.number}
                        totalPages={data.page.totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    )
}
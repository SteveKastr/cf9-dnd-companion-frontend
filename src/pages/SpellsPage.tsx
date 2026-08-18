import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getSpells } from "@/api/spells.ts"
import { getClasses } from "@/api/classes.ts"
import { Card } from "@/components/ui/card.tsx"
import { Link } from "react-router-dom"
import { PaginationControls } from "@/components/PaginationControls.tsx"

const SPELL_LEVELS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function SpellsPage() {
    const [searchParams, setSearchParams] = useSearchParams()

    const currentPage = Number(searchParams.get("page") ?? "0")
    const levelFilter = searchParams.get("level") ?? ""
    const classFilter = searchParams.get("class") ?? ""

    const { data: classes } = useQuery({
        queryKey: ["classes"],
        queryFn: getClasses,
    })

    const { data, isLoading, error } = useQuery({
        queryKey: ["spells", currentPage, levelFilter, classFilter],
        queryFn: () =>
            getSpells(
                currentPage,
                18,
                levelFilter === "" ? undefined : Number(levelFilter),
                classFilter === "" ? undefined : classFilter
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

    const handleLevelChange = (value: string) => {
        updateParams({ level: value, page: "0" })
    }

    const handleClassChange = (value: string) => {
        updateParams({ class: value, page: "0" })
    }

    const handlePageChange = (page: number) => {
        updateParams({ page: String(page) })
    }

    return (
        <div className="relative min-h-screen">
            <div
                className="fixed inset-0 -z-10 bg-cover bg-center"
                style={{ backgroundImage: "url(/images/spells-bg.jpg)" }}
            />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4 inline-block bg-amber-50 text-red-800 px-4 py-2 rounded-md">Spells</h1>

                <div className="flex gap-4 mb-6">
                    <select
                        value={levelFilter}
                        onChange={(e) => handleLevelChange(e.target.value)}
                        className="rounded-md border border-input bg-white px-3 py-2 text-sm"
                    >
                        <option value="">All Levels</option>
                        {SPELL_LEVELS.map((lvl) => (
                            <option key={lvl} value={lvl}>
                                {lvl === 0 ? "Cantrip" : `Level ${lvl}`}
                            </option>
                        ))}
                    </select>

                    <select
                        value={classFilter}
                        onChange={(e) => handleClassChange(e.target.value)}
                        className="rounded-md border border-input bg-white px-3 py-2 text-sm"
                    >
                        <option value="">All Classes</option>
                        {classes?.map((cls) => (
                            <option key={cls.index} value={cls.name}>
                                {cls.name}
                            </option>
                        ))}
                    </select>
                </div>

                {isLoading && <p>Loading spells...</p>}

                {error && (
                    <p className="text-red-600">
                        Error: {error instanceof Error ? error.message : "Failed to load spells"}
                    </p>
                )}

                {data && (
                    <>
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

                        {data.content.length === 0 && (
                            <p className="text-red-800 font-semibold bg-amber-50 inline-block px-3 py-1.5 rounded-md">No spells found matching these filters.</p>
                        )}

                        <PaginationControls
                            currentPage={data.page.number}
                            totalPages={data.page.totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>
        </div>
    )
}
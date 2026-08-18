import { useSearchParams, Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getItems } from "@/api/items.ts"
import { Card } from "@/components/ui/card.tsx"
import { PaginationControls } from "@/components/PaginationControls.tsx"
import { useAuth } from "@/context/AuthContext.ts"

const EQUIPMENT_CATEGORIES = [
    "Weapon",
    "Armor",
    "Adventuring Gear",
    "Ammunition",
    "Tools",
    "Mounts and Vehicles",
]

export default function ItemsPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const { role } = useAuth()

    const currentPage = Number(searchParams.get("page") ?? "0")
    const categoryFilter = searchParams.get("category") ?? ""
    const typeFilter = searchParams.get("type") ?? ""

    const canFilterByType = role === "ADMIN" || role === "GAME_MASTER"

    const { data, isLoading, error } = useQuery({
        queryKey: ["items", currentPage, categoryFilter, typeFilter],
        queryFn: () =>
            getItems(
                currentPage,
                18,
                categoryFilter === "" ? undefined : categoryFilter,
                typeFilter === "" ? undefined : typeFilter
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

    const handleCategoryChange = (value: string) => {
        updateParams({ category: value, page: "0" })
    }

    const handleTypeChange = (value: string) => {
        updateParams({ type: value, page: "0" })
    }

    const handlePageChange = (page: number) => {
        updateParams({ page: String(page) })
    }

    return (
        <div className="relative min-h-screen">
            <div
                className="fixed inset-0 -z-10 bg-cover bg-center"
                style={{ backgroundImage: "url(/images/items-bg.jpg)" }}
            />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4 inline-block bg-amber-50 text-red-800 px-4 py-2 rounded-md">Items</h1>

                <div className="flex gap-4 mb-6">
                    <select
                        value={categoryFilter}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="rounded-md border border-input bg-white px-3 py-2 text-sm"
                    >
                        <option value="">All Categories</option>
                        {EQUIPMENT_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    {canFilterByType && (
                        <select
                            value={typeFilter}
                            onChange={(e) => handleTypeChange(e.target.value)}
                            className="rounded-md border border-input bg-white px-3 py-2 text-sm"
                        >
                            <option value="">All Types</option>
                            <option value="mundane">Mundane</option>
                            <option value="magic">Magic</option>
                        </select>
                    )}
                </div>

                {isLoading && <p>Loading items...</p>}

                {error && (
                    <p className="text-red-600">
                        Error: {error instanceof Error ? error.message : "Failed to load items"}
                    </p>
                )}

                {data && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {data.content.map((item) => (
                                <Link key={item.id} to={`/items/${item.index}`}>
                                    <Card className="p-4 space-y-2 cursor-pointer hover:border-primary/50 hover:bg-accent transition-colors h-full">
                                        <h2 className="text-xl font-semibold">{item.name}</h2>
                                        <p className="text-sm text-muted-foreground">{item.equipmentCategory.name}</p>
                                        {item.itemType === "magic" && item.rarity && (
                                            <p className="text-sm text-amber-600">{item.rarity.name}</p>
                                        )}
                                    </Card>
                                </Link>
                            ))}
                        </div>

                        {data.content.length === 0 && (
                            <p className="text-muted-foreground">No items found matching these filters.</p>
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
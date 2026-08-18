import { useQuery } from "@tanstack/react-query"
import { getRaces } from "@/api/races.ts"
import { Card } from "@/components/ui/card.tsx"
import { Link } from "react-router-dom"

export default function RacesPage() {
    const { data: races, isLoading, error } = useQuery({
        queryKey: ["races"],
        queryFn: getRaces,
    })

    if (isLoading) {
        return <p className="p-4">Loading races...</p>
    }

    if (error) {
        return (
            <p className="p-4 text-red-600">
                Error: {error instanceof Error ? error.message : "Failed to load races"}
            </p>
        )
    }

    return (
        <div className="relative min-h-screen">
            <div
                className="fixed inset-0 -z-10 bg-cover bg-center"
                style={{ backgroundImage: "url(/images/races-bg.jpg)" }}
            />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-6 inline-block bg-amber-50 text-red-800 px-4 py-2 rounded-md">Races</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {races?.map((race) => (
                        <Link key={race.id} to={`/races/${race.index}`}>
                            <Card className="p-4 space-y-2 cursor-pointer hover:border-primary/50 hover:bg-accent transition-colors h-full">
                                <h2 className="text-xl font-semibold">{race.name}</h2>
                                <p className="text-sm text-muted-foreground">Size: {race.size}</p>
                                <p className="text-sm">Speed: {race.speed} ft.</p>
                                <p className="text-sm line-clamp-3">{race.alignment}</p>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
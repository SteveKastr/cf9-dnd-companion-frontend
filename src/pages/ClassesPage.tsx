import { useQuery } from "@tanstack/react-query"
import { getClasses } from "@/api/classes.ts"
import { Card } from "@/components/ui/card.tsx"
import { Link } from "react-router-dom"

export default function ClassesPage() {
    const { data: classes, isLoading, error } = useQuery({
        queryKey: ["classes"],
        queryFn: getClasses,
    })

    if (isLoading) {
        return <p className="p-4">Loading classes...</p>
    }

    if (error) {
        return (
            <p className="p-4 text-red-600">
                Error: {error instanceof Error ? error.message : "Failed to load classes"}
            </p>
        )
    }

    return (
        <div className="relative min-h-screen">
            <div
                className="fixed inset-0 -z-10 bg-cover bg-center"
                style={{ backgroundImage: "url(/images/classes-bg.jpg)" }}
            />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-6">Classes</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {classes?.map((cls) => (
                        <Link key={cls.id} to={`/classes/${cls.index}`}>
                            <Card className="p-4 space-y-2 cursor-pointer hover:border-primary/50 hover:bg-accent transition-colors h-full">
                                <h2 className="text-xl font-semibold">{cls.name}</h2>
                                <p className="text-sm text-muted-foreground">Hit Die: d{cls.hitDie}</p>
                                {cls.subclasses.length > 0 && (
                                    <p className="text-sm">{cls.subclasses.length} subclass(es)</p>
                                )}
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
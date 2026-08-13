import { useQuery } from "@tanstack/react-query"
import { getRules } from "@/api/rules.ts"
import { Card } from "@/components/ui/card.tsx"
import { Link } from "react-router-dom"


export default function RulesPage() {
    const { data: rules, isLoading, error } = useQuery({
        queryKey: ["rules"],
        queryFn: getRules,
    })

    if (isLoading) {
        return <p className="p-4">Loading rules...</p>
    }

    if (error || !rules) {
        return (
            <p className="p-4 text-red-600">
                Error: {error instanceof Error ? error.message : "Failed to load rules"}
            </p>
        )
    }

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Rules Reference</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {rules.map((rule) => (
                    <Link key={rule.id} to={`/rules/${rule.index}`}>
                        <Card className="p-4 cursor-pointer hover:border-primary/50 hover:bg-accent transition-colors h-full">
                            <h2 className="text-xl font-semibold">{rule.name}</h2>
                            <p className="text-sm text-muted-foreground">
                                {rule.subsections.length} section{rule.subsections.length !== 1 ? "s" : ""}
                            </p>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
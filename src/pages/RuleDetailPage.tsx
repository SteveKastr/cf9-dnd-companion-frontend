import { useParams, useNavigate } from "react-router-dom"
import { useQuery, useQueries } from "@tanstack/react-query"
import { getRuleByIndex } from "@/api/rules.ts"
import { getRuleSectionByIndex } from "@/api/ruleSections.ts"
import { Card } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function RuleDetailPage() {
    const { ruleIndex } = useParams<{ ruleIndex: string }>()
    const navigate = useNavigate()

    const { data: rule, isLoading, error } = useQuery({
        queryKey: ["rules", ruleIndex],
        queryFn: () => getRuleByIndex(ruleIndex!),
        enabled: !!ruleIndex,
    })

    if (isLoading) {
        return (
            <p className="p-4 inline-block bg-amber-50 text-red-800 font-semibold px-4 py-2 rounded-md">
                Loading rule...
            </p>
        )
    }

    if (error || !rule) {
        return (
            <p className="p-4 inline-block bg-amber-50 text-red-800 font-semibold px-4 py-2 rounded-md">
                Error: {error instanceof Error ? error.message : "Rule not found"}
            </p>
        )
    }

    return (
        <div className="relative min-h-screen">
            <div
                className="fixed inset-0 -z-10 bg-cover bg-center"
                style={{ backgroundImage: "url(/images/rules-bg.jpg)" }}
            />
            <div className="p-4 max-w-3xl mx-auto space-y-6">
                <Button variant="secondary" onClick={() => navigate(-1)}>
                    &larr; Back
                </Button>

                <Card className="p-6 space-y-6">
                    <div className="prose prose-sm max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{rule.desc}</ReactMarkdown>
                    </div>

                    {rule.subsections.length > 0 && (
                        <RuleSectionsList sectionIndexes={rule.subsections.map((s) => s.index)} />
                    )}
                </Card>
            </div>
        </div>
    )
}

function RuleSectionsList({ sectionIndexes }: { sectionIndexes: string[] }) {
    const sectionQueries = useQueries({
        queries: sectionIndexes.map((index) => ({
            queryKey: ["rule-sections", index],
            queryFn: () => getRuleSectionByIndex(index),
        })),
    })

    return (
        <div className="space-y-6">
            {sectionQueries.map((query, i) => {
                if (query.isLoading) {
                    return <p key={i} className="text-sm text-muted-foreground">Loading section...</p>
                }
                if (query.error || !query.data) {
                    return null
                }
                return (
                    <div key={query.data.index} className="prose prose-sm max-w-none border-t pt-4">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{query.data.desc}</ReactMarkdown>
                    </div>
                )
            })}
        </div>
    )
}
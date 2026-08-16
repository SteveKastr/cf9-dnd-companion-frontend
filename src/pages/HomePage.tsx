import { useAuth } from "@/context/AuthContext.ts"
import { Card } from "@/components/ui/card.tsx"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDragon } from "@fortawesome/free-solid-svg-icons"
import { LoginForm } from "@/components/LoginForm.tsx"
import { RegisterForm } from "@/components/RegisterForm.tsx"

type NavCard = {
    to: string
    title: string
    description: string
}

export default function HomePage() {
    const { isAuthenticated, role } = useAuth()

    const primaryCards: NavCard[] = [
        { to: "/races", title: "Races", description: "Browse playable races" },
        { to: "/classes", title: "Classes", description: "Browse character classes" },
    ]

    const secondaryCards: NavCard[] = [
        { to: "/spells", title: "Spells", description: "Browse the spell list" },
        { to: "/items", title: "Items", description: "Browse equipment and magic items" },
        { to: "/backgrounds-feats", title: "Backgrounds / Feats", description: "Character building reference" },
        { to: "/rules", title: "Rules", description: "Reference for game rules" },
    ]

    if (role === "ADMIN" || role === "GAME_MASTER") {
        secondaryCards.push({ to: "/monsters", title: "Monsters", description: "Browse the bestiary" })
    }

    if (role === "ADMIN") {
        secondaryCards.push({ to: "/admin/users", title: "Users", description: "Manage application users" })
    }

    return (
        <div className="flex gap-8 p-4">
            <aside className="hidden lg:flex flex-col items-center justify-center w-64 shrink-0 text-center gap-4">
                <h1 className="text-3xl font-bold">D&D Companion</h1>
                <FontAwesomeIcon icon={faDragon} className="text-6xl text-slate-700" />
            </aside>

            <div className="flex-1 space-y-8">
                {!isAuthenticated && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="p-6 space-y-4">
                            <h2 className="text-xl font-semibold text-center">Login</h2>
                            <LoginForm />
                        </Card>
                        <Card className="p-6 space-y-4">
                            <h2 className="text-xl font-semibold text-center">Register</h2>
                            <RegisterForm />
                        </Card>
                    </div>
                )}

                {isAuthenticated && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {primaryCards.map((card) => (
                                <NavCardItem key={card.to} card={card} />
                            ))}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {secondaryCards.map((card) => (
                                <NavCardItem key={card.to} card={card} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

function NavCardItem({ card }: { card: NavCard }) {
    return (
        <Link to={card.to}>
            <Card className="p-4 space-y-1 cursor-pointer hover:border-primary/50 hover:bg-accent transition-colors h-full">
                <h2 className="text-lg font-semibold">{card.title}</h2>
                <p className="text-sm text-muted-foreground">{card.description}</p>
            </Card>
        </Link>
    )
}
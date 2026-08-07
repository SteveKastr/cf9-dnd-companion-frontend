import { Link } from "react-router-dom"
import { AuthButton } from "@/components/AuthButton.tsx"
import { useAuth } from "@/context/AuthContext.ts"

const Header = () => {
    const { isAuthenticated, role } = useAuth()

    return (
        <header className="bg-slate-900 fixed w-full z-50">
            <div className="container mx-auto px-4 flex items-center justify-between py-4">
                <Link to="/" className="text-white font-bold text-xl">
                    D&D Companion
                </Link>
                <div className="flex items-center gap-4 text-white font-medium">
                    <Link to="/">Home</Link>
                    {isAuthenticated && (
                        <>
                            <Link to="/races">Races</Link>
                            <Link to="/spells">Spells</Link>
                            <Link to="/classes">Classes</Link>
                            <Link to="/items">Items</Link>
                            {(role === "ADMIN" || role === "GAME_MASTER") && (
                                <Link to="/monsters">Monsters</Link>
                            )}
                        </>
                    )}
                    {!isAuthenticated && (
                        <Link to="/register">Register</Link>
                    )}
                    <AuthButton />
                </div>
            </div>
        </header>
    )
}

export default Header
import { Link } from "react-router-dom"
import { AuthButton } from "@/components/AuthButton.tsx"
import { useAuth } from "@/context/AuthContext.ts"
import { Button } from "@/components/ui/button.tsx"
import { Menu } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

const Header = () => {
    const { isAuthenticated, role } = useAuth()

    return (
        <header className="bg-slate-900 fixed w-full z-50">
            <div className="container mx-auto px-4 flex items-center justify-between py-4">
                <Link to="/" className="text-white font-bold text-xl">
                    D&D Companion
                </Link>

                <div className="flex items-center gap-4">
                    {isAuthenticated && (
                        <Link to="/my-account">
                            <Button variant="secondary" size="icon">
                                <FontAwesomeIcon icon={faUser} />
                            </Button>
                        </Link>
                    )}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link to="/">Home</Link>
                            </DropdownMenuItem>

                            {isAuthenticated && (
                                <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link to="/my-account">My Account</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link to="/races">Races</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link to="/classes">Classes</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link to="/spells">Spells</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link to="/items">Items</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link to="/backgrounds-feats">Backgrounds / Feats</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link to="/rules">Rules</Link>
                                    </DropdownMenuItem>


                                    {(role === "ADMIN" || role === "GAME_MASTER") && (
                                        <DropdownMenuItem asChild>
                                            <Link to="/monsters">Monsters</Link>
                                        </DropdownMenuItem>
                                    )}

                                    {role === "ADMIN" && (
                                        <DropdownMenuItem asChild>
                                            <Link to="/admin/users">Users</Link>
                                        </DropdownMenuItem>
                                    )}
                                </>
                            )}

                            {!isAuthenticated && (
                                <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link to="/register">Register</Link>
                                    </DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <AuthButton />
                </div>
            </div>
        </header>
    )
}

export default Header
import { Route, Routes } from "react-router-dom"
import RouterLayout from "@/components/RouterLayout.tsx"
import HomePage from "@/pages/HomePage.tsx"
import LoginPage from "@/pages/LoginPage.tsx"
import RegisterPage from "@/pages/RegisterPage.tsx"
import RacesPage from "@/pages/RacesPage.tsx"
import SpellsPage from "@/pages/SpellsPage.tsx"
import ClassesPage from "@/pages/ClassesPage.tsx"
import ItemsPage from "@/pages/ItemsPage.tsx"
import MonstersPage from "@/pages/MonstersPage.tsx"
import ProtectedRoute from "@/components/ProtectedRoute.tsx"
import RoleProtectedRoute from "@/components/RoleProtectedRoute.tsx"
import RaceDetailPage from "@/pages/RaceDetailPage.tsx"

function App() {
    return (
        <Routes>
            <Route element={<RouterLayout />}>
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="races" element={<RacesPage />} />
                    <Route path="races/:raceIndex" element={<RaceDetailPage />} />
                    <Route path="spells" element={<SpellsPage />} />
                    <Route path="classes" element={<ClassesPage />} />
                    <Route path="items" element={<ItemsPage />} />

                    <Route element={<RoleProtectedRoute allowedRoles={["ADMIN", "GAME_MASTER"]} />}>
                        <Route path="monsters" element={<MonstersPage />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}

export default App
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
import ClassDetailPage from "@/pages/ClassDetailPage.tsx"
import SpellDetailPage from "@/pages/SpellDetailPage.tsx"
import ItemDetailPage from "@/pages/ItemDetailPage.tsx"
import CharacterBuildingPage from "@/pages/CharacterBuildingPage.tsx"
import MonsterDetailPage from "@/pages/MonsterDetailPage.tsx"
import RulesPage from "@/pages/RulesPage.tsx"
import RuleDetailPage from "@/pages/RuleDetailPage.tsx"
import AdminUsersPage from "@/pages/AdminUsersPage.tsx"
import MyAccountPage from "@/pages/MyAccountPage.tsx"

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
                    <Route path="spells/:spellIndex" element={<SpellDetailPage />} />
                    <Route path="classes" element={<ClassesPage />} />
                    <Route path="classes/:classIndex" element={<ClassDetailPage />} />
                    <Route path="backgrounds-feats" element={<CharacterBuildingPage />} />
                    <Route path="items" element={<ItemsPage />} />
                    <Route path="items/:itemIndex" element={<ItemDetailPage />} />
                    <Route path="rules" element={<RulesPage />} />
                    <Route path="rules/:ruleIndex" element={<RuleDetailPage />} />
                    <Route path="my-account" element={<MyAccountPage />} />

                    <Route element={<RoleProtectedRoute allowedRoles={["ADMIN", "GAME_MASTER"]} />}>
                        <Route path="monsters" element={<MonstersPage />} />
                        <Route path="monsters/:monsterIndex" element={<MonsterDetailPage />} />
                    </Route>
                    <Route element={<RoleProtectedRoute allowedRoles={["ADMIN"]} />}>
                        <Route path="admin/users" element={<AdminUsersPage />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}

export default App
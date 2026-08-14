export type Role = "ADMIN" | "GAME_MASTER" | "PLAYER"

export type User = {
    id: string
    firstName: string
    lastName: string
    username: string
    email: string
    role: Role
    active: boolean
}
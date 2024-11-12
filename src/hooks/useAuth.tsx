import { getStoredUser, setStoredUser } from "@/lib/auth"
import React from "react"



export interface AuthContext {
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    user: string | null
}

const AuthContext = React.createContext<AuthContext | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = React.useState<string | null>(getStoredUser())
    const isAuthenticated = !!user

    const logout = React.useCallback(async () => {
        setStoredUser(null)
        setUser(null)
    }, [])

    const login = React.useCallback(async (email: string, password: string) => {
        setStoredUser(email + ":"+ password)
        setUser(email + ":"+ password)
    }, [])

    React.useEffect(() => {
        setUser(getStoredUser())
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
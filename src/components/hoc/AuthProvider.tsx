import React, { createContext, useState } from "react"
import { IUser } from "../../types/user"

interface IAuthProviderProps {
    children: React.ReactNode
}

interface IAuthContext {
    user: IUser | null,
    signIn: (newUser: IUser, cb: () => void) => void
    signOut: (cb: () => void) => void
}

export const AuthContext = createContext<IAuthContext | null>(null)
const AuthProvider = (props: IAuthProviderProps) => {
    const { children } = props

    const [user, setUser] = useState<IUser | null>(null)

    const signIn = (newUser: IUser, cb: () => void) => {
        setUser(newUser)
        cb()
    }
    const signOut = (cb: () => void) => {
        setUser(null)
        cb()
    }

    const value = { user, signIn, signOut }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
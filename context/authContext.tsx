'use client'
import { removeAuthTokens } from '@/lib/actions';
import { UserSchemaT } from '@/lib/schemas';
import { BaseRequestHeaders } from '@/lib/utils';
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

export interface AuthContextProps {
    userInfo: UserSchemaT;
    isAuthenticated: boolean;
    logout: () => void
}

export const AuthContext = createContext<AuthContextProps | null>(null)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<UserSchemaT>({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        gender: "f"
    })

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('/api/auth', {
                    headers: { ...BaseRequestHeaders }
                })
                const result = await response.json()
                if (!response.ok) {
                    setIsAuthenticated(false)
                } else {
                    setIsAuthenticated(true)
                    setUserInfo(result.data)
                }
            } catch (err) {
                setIsAuthenticated(false)
            }
        }
        fetchUserInfo();
    }, []);

    const logout = () => {
        console.log("logging out")
        setIsAuthenticated(false)
        window.location.href = "/signin?action=logout"
    }

    const value: AuthContextProps = {
        userInfo: userInfo,
        isAuthenticated: isAuthenticated,
        logout: logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};

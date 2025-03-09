import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Definindo o tipo do usuário
interface User {
    id?: string;
    name: string;
    email: string;
    password?: string;
    token?: string;
}

// Tipando o valor do contexto
interface AuthContextType {
    registro: (userData: User) => void;
    login: (userData: User) => void;
    logout: () => void;
    authenticated: boolean;
}

interface DecodedToken {
    exp: number
}

// Criando o contexto com valor inicial
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode; // Permite que o provider tenha qualquer tipo de conteúdo como filho
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [authenticated, setIsAuthenticated] = useState<boolean>(false);

    const isTokenExpired = (token: string): boolean => {
        try {
            const decoded: DecodedToken = jwtDecode(token);
            return decoded.exp * 1000 < Date.now(); // Converte expiração para milissegundos e compara
        } catch (error) {
            return true; // Se houver erro ao decodificar, considera expirado
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken && !isTokenExpired(storedToken)) {
            setIsAuthenticated(true);
        } else {
            logout(); // Faz logout se o token estiver expirado
        }
    }, []);

    const login = (userData: User) => {
        if (userData.token) {
            localStorage.setItem('token', userData.token);
            setIsAuthenticated(true);
        }
    };

    const registro = (userData: User) => {
        if (userData.token) {
            localStorage.setItem('token', userData.token);
            setIsAuthenticated(true);
        }
    };

    const logout = () => {

        setIsAuthenticated(false);
        localStorage.removeItem('token');
    };



    return (
        <AuthContext.Provider value={{ registro, login, logout, authenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook para consumir o contexto
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../Api';


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
    refreshUser: () => void;
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

    const [user, setUser] = useState<User | null>(null);

    const isTokenExpired = (token: string): boolean => {
        try {
            const decoded: DecodedToken = jwtDecode(token);
            return decoded.exp * 1000 < Date.now(); // Converte expiração para milissegundos e compara
        } catch (error) {
            return true; // Se houver erro ao decodificar, considera expirado
        }
    };

    const [authenticated, setIsAuthenticated] = useState<boolean>(true)

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken && !isTokenExpired(storedToken)) {
            setIsAuthenticated(true);
            refreshUser();
        } else {
            handleSessionExpired();
        }
    }, [authenticated]);

    const handleSessionExpired = () => {
        logout();
        // window.location.href = "/login"; // 👈 Redireciona para login
    };

    const login = (userData: User) => {
        if (userData.token) {
            localStorage.setItem('token', userData.token);
            setIsAuthenticated(true);
            window.location.href = "/tasks";
        }
    };

    const registro = (userData: User) => {
        if (userData.token) {
            localStorage.setItem('token', userData.token);
            setIsAuthenticated(true);
            setUser(userData)
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
    };

    const refreshUser = async () => {
        try {
            const response = await api.get("/me"); // Endpoint para obter o usuário autenticado
            console.log("Usuário atualizado:", response.data);
            setUser(response.data);
        } catch (error) {
            console.error("Erro ao buscar usuário atualizado:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ authenticated, registro, login, logout, refreshUser }}>
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
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../Api';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/auth/AuthService';


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
    login: (userData: User) => void;
    logout: () => void;
    authenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
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
    const navigate = useNavigate();
    const [authenticated, setIsAuthenticated] = useState<boolean>(true)

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
            refreshUser();
        } else {
            handleSessionExpired();
        }
    }, [authenticated]);

    const handleSessionExpired = () => {
        logout();
        navigate('/login'); // 👈 Redireciona para login
    };

    const login = async (userData: any) => {
        try {
            await AuthService.login(userData, setIsAuthenticated);  // Passando a função setIsAuthenticated para o AuthService
        } catch (error) {
            throw { error: "Erro ao fazer login" };
        }
    };

    // const registro = (userData: User) => {
    //     if (userData.token) {
    //         localStorage.setItem('token', userData.token);
    //         setIsAuthenticated(true);
    //         setUser(userData)
    //     }
    // };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        navigate('/login');
    };

    const refreshUser = async () => {
        try {
            const response = await api.get("/me");
            setUser(response.data);
        } catch (error) {
            throw { error: "Erro ao buscar usuário" };
        }
    };

    return (
        <AuthContext.Provider value={{ authenticated, setIsAuthenticated, login, logout, refreshUser }}>
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
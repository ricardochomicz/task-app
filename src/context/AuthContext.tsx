import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';


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

// Criando o contexto com valor inicial
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode; // Permite que o provider tenha qualquer tipo de conteúdo como filho
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [authenticated, setIsAuthenticated] = useState<boolean>(false);


    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (userData: User) => {

        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData)); // Armazenando o usuário no localStorage
    };

    const registro = (userData: User) => {

        setIsAuthenticated(true);
        localStorage.setItem('token', userData.token || '');  // Armazenando o usuário no localStorage
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
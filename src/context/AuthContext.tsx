import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

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
    authenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    logout: () => void;
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
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            if (isTokenExpired(storedToken)) {
                handleSessionExpired(); // Chama o logout se o token estiver expirado
            } else {
                setIsAuthenticated(true);
            }
        }
    }, []);

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleSessionExpired = () => {
        logout();
        navigate('/login'); // 👈 Redireciona para login
    };

    return (
        <AuthContext.Provider value={{ authenticated, setIsAuthenticated, logout }}>
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
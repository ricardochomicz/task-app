import axios from 'axios';
import api from '../../Api';
import { IUser } from '../../interfaces/UserInterface';
import { jwtDecode } from "jwt-decode";


const API_URL = 'http://localhost:8080/api';

interface UserData {
    name: string;
    email: string;
    password: string;
}

interface Credentials {
    email: string;
    password: string;
}

interface AuthResponse {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

export const AuthService = {

    async register(data: UserData): Promise<AuthResponse> {
        try {
            const response = await api.post("/register", data);
            console.log(response)
            const { token } = response.data;

            if (token) {
                this.setToken(token);
            }

            return response.data;
        } catch (error: any) {
            throw error.response?.data || { error: "Erro ao fazer cadastro" };
        }
    },

    setToken(token: string): void {
        localStorage.setItem("token", token);
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },

    getToken(): string | null {
        return localStorage.getItem("token");
    },

    async login(credentials: Credentials): Promise<AuthResponse> {
        try {
            const response = await api.post("/login", credentials);
            console.log(response)
            const { token } = response.data;

            if (token) {
                this.setToken(token);
                await this.getUser();
            }

            return response.data;
        } catch (error: any) {
            throw error.response?.data || { error: "Erro ao fazer login" };
        }
    },

    getUserFromToken(): IUser | null {
        const token = this.getToken();
        if (!token) return null;

        try {
            return jwtDecode<IUser>(token); // Retorna { id, name, email }
        } catch (error) {
            console.error("Erro ao decodificar token:", error);
            return null;
        }
    },

    async getUser(): Promise<IUser | null> {
        const token = this.getToken();
        if (!token) return null;
        try {
            const response = await api.get("/me");
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            return null;
        }
    },

    removeToken(): void {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common['Authorization'];
    },

    async logout(): Promise<void> {
        try {
            await api.post('/logout');  // Faz a requisição de logout
            this.removeToken();
        } catch (error) {
            console.error('Erro ao realizar logout:', error);
        }

    },
}
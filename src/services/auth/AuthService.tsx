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

    // Função para registrar um novo usuário
    async register(data: UserData, setAuthenticated: (value: boolean) => void): Promise<AuthResponse> {
        try {
            const response = await api.post("/register", data);
            console.log(response)
            const { token } = response.data;

            // Se o token for retornado, armazena-o e define o usuário como autenticado
            if (token) {
                this.setToken(token);
                setAuthenticated(true);
            }

            return response.data;
        } catch (error: any) {
            throw { error: error.response?.data?.message || "Erro ao fazer cadastro" };
        }
    },

    // Função para armazenar o token no localStorage e configurar o cabeçalho de autorização
    setToken(token: string): void {
        localStorage.setItem("token", token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },

    // Função para obter o token do localStorage
    getToken(): string | null {
        return localStorage.getItem("token");
    },

    // Função para fazer login do usuário
    async login(credentials: Credentials, setAuthenticated: (value: boolean) => void): Promise<AuthResponse> {
        try {
            const response = await api.post("/login", credentials);
            console.log(response)
            const { token } = response.data;
            if (token) {
                this.setToken(token);
                await this.getUser();
                setAuthenticated(true);
            }
            return response.data;
        } catch (error: any) {
            console.log(error)
            throw { error: error.response?.data?.message || "Erro ao fazer login, verifique suas credenciais" };
        }
    },

    // Função para obter o usuário a partir do token
    getUserFromToken(): IUser | null {
        const token = this.getToken();
        if (!token) return null;

        try {
            return jwtDecode<IUser>(token); // Retorna { id, name, email }
        } catch (error) {
            throw { error: "Erro ao decodificar token" };
        }
    },

    // Função para obter os dados do usuário autenticado
    async getUser(): Promise<IUser | null> {
        const token = this.getToken();
        if (!token) return null;
        try {
            const response = await api.get("/me");
            return response.data;
        } catch (error: any) {
            throw { error: error.response?.data?.message || "Erro ao buscar usuário." };
        }
    },

    // Função para remover o token do localStorage e do cabeçalho de autorização
    removeToken(): void {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common['Authorization'];
    },

    // Função para fazer logout do usuário
    async logout(): Promise<void> {
        try {
            await api.post('/logout');  // Faz a requisição de logout
            this.removeToken();
        } catch (error: any) {
            throw { error: error.response?.data?.message || "Erro ao fazer logout" };
        }

    },
}
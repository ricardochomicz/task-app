import axios, { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { AuthService } from './services/auth/AuthService';
import { useAuth } from './context/AuthContext';

// Criação da instância do axios
const api = axios.create({
    baseURL: "http://localhost:8080/api", // Ajuste a URL base conforme necessário
});


// Intercepta todas as requisições e adiciona o token automaticamente
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = AuthService.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Adiciona o token no header de requisição
        }
        return config; // Retorna a configuração da requisição com o token
    },
    (error: AxiosError) => {
        // Se ocorrer um erro na requisição, retorna a promessa rejeitada
        return Promise.reject(error);
    }
);

// // Intercepta as respostas para verificar erros globais (como token expirado)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const { logout } = useAuth();
            logout(); // Token inválido? Faz logout e redireciona
        }
        return Promise.reject(error);
    }
);
export default api;
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { AuthService } from './services/auth/AuthService';
import { useNavigate } from 'react-router-dom';

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
// api.interceptors.response.use(
//     (response) => {
//         return response; // Retorna a resposta da API
//     },
//     (error: AxiosError) => {
//         console.error("Erro da API:", error);

//         // Verifica se há resposta da API
//         if (error.response) {

//             // Se o status da resposta for 401 (não autorizado), trata o token expirado
//             if (error.response.status === 401 || error.response.data?.details === "jwt expired") {
//                 window.location.href = "/login";
//                 AuthService.removeToken(); // Remove o token inválido
//             }
//         } else {
//             // Caso não haja resposta do servidor
//             console.error("Erro sem resposta do servidor:", error);
//         }
//         return Promise.reject(error); // Retorna o erro caso contrário
//     }
// );

export default api;
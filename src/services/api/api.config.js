import axios from 'axios';

// URL base da API (backend NestJS do TCC)
const API_URL = import.meta.env.VITE_API_URL || 'https://seuservidor.online/api';

// Criar instância do axios
const api = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 segundos (importante para upload de imagens)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token às requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
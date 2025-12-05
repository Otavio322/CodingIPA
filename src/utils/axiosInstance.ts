import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

// Interceptor de requisição para adicionar cabeçalhos, sem JWT
api.interceptors.request.use((config) => {
  // Se você precisar de algum outro cabeçalho, pode adicionar aqui
  // Exemplo: config.headers["Custom-Header"] = "value";
  return config;
});

export default api;

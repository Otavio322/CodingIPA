import api from "../utils/axiosInstance";
import { Agricultor } from "../types/Agricultor";
import { IProducaoSementes } from "../types/IProducaoSementes"; // Importação CORRIGIDA para IProducaoSementes

export const agricultoresService = {
  login: (username: string, senha: string) =>
    api.post("/auth/login", { username, senha }),

  listar: () => api.get<Agricultor[]>("/agricultores"),

  buscar: (cpfCnpj: string) => api.get<Agricultor>(`/agricultores/${cpfCnpj}`),

  criar: (agricultor: Agricultor) => api.post("/agricultores", agricultor),

  atualizar: (cpfCnpj: string, agricultor: Agricultor) =>
    api.put(`/agricultores/${cpfCnpj}`, agricultor),

  deletar: (cpfCnpj: string) => api.delete(`/agricultores/${cpfCnpj}`),

  // Métodos para produção de sementes
  listarProducoes: () => api.get<IProducaoSementes[]>("/producao-sementes"), // Lista todas as produções de sementes

  criarProducao: (producao: IProducaoSementes) => api.post("/producao-sementes", producao), // Cria nova produção de sementes

  atualizarProducao: (id: number, producao: IProducaoSementes) =>
    api.put(`/producao-sementes/${id}`, producao), // Atualiza uma produção de sementes existente

  deletarProducao: (id: number) => api.delete(`/producao-sementes/${id}`), // Deleta uma produção de sementes
};
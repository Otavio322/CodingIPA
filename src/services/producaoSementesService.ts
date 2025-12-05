import api from "../utils/axiosInstance";  // Sua instância do axios
import { IProducaoSementes } from "../types/IProducoesSementes"; // Tipo da Produção de Sementes

export const producaoSementesService = {
  // Função para obter todas as produções de sementes
  listar: () => api.get<IProducaoSementes[]>("/api/producao-sementes"),

  // Função para obter uma produção de sementes específica
  buscar: (id: number) => api.get<IProducaoSementes>(`/api/producao-sementes/${id}`),

  // Função para criar uma nova produção de sementes
  criar: (producao: IProducaoSementes) => api.post("/api/producao-sementes", producao),

  // Função para atualizar uma produção de sementes existente
  atualizar: (id: number, producao: IProducaoSementes) => api.put(`/api/producao-sementes/${id}`, producao),

  // Função para deletar uma produção de sementes
  deletar: (id: number) => api.delete(`/api/producao-sementes/${id}`),
};

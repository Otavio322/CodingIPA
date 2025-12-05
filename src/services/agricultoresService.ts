import api from "@/utils/axiosInstance";
import { Agricultor } from "@/types/Agricultor";
import { IProducaoSementes } from "@/types/IProducoesSementes";

export const agricultoresService = {
  // Auth
  login: (username: string, senha: string) =>
    api.post("/auth/login", { username, senha }),

  // Agricultores
  listar: () => api.get<Agricultor[]>("/agricultores"),
  buscar: (cpfCnpj: string) => api.get<Agricultor>(`/agricultores/${cpfCnpj}`),
  criar: (agricultor: Agricultor) => api.post("/agricultores", agricultor),
  atualizar: (cpfCnpj: string, agricultor: Agricultor) =>
    api.put(`/agricultores/${cpfCnpj}`, agricultor),
  deletar: (cpfCnpj: string) => api.delete(`/agricultores/${cpfCnpj}`),

  // Produção de sementes
  listarProducoes: () => api.get<IProducaoSementes[]>("/producao-sementes"),
  criarProducao: (producao: IProducaoSementes) =>
    api.post("/producao-sementes", producao),
  atualizarProducao: (id: number, producao: IProducaoSementes) =>
    api.put(`/producao-sementes/${id}`, producao),
  deletarProducao: (id: number) => api.delete(`/producao-sementes/${id}`)
};
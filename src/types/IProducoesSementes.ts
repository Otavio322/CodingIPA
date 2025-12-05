export interface IProducaoSementes {
  id?: number; // O ID é opcional ao criar um novo registro
  tipoSemente: string;
  quantidadeSementes: number;
  preco: number;
  validade: string; // Armazenado como string (formato Date do input HTML)
}
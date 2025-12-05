import React, { useState, useEffect } from "react";
import { agricultoresService } from "../services/agricultoresService";
import { IProducaoSementes } from "../types/IProducoesSementes"; 

export default function ProducaoSementesPage() {
  const [lista, setLista] = useState<IProducaoSementes[]>([]);
  
  // ESTADO NOVO: Guarda o ID de quem estamos editando. Se for null, estamos criando.
  const [editandoId, setEditandoId] = useState<number | null>(null);

  // O formulário continua sem ID, pois quem define o ID é o banco ou a variável editandoId
  const [formData, setFormData] = useState<Omit<IProducaoSementes, 'id'>>({
    tipoSemente: "",
    quantidadeSementes: 0,
    preco: 0.0,
    validade: "",
  });

  useEffect(() => {
    carregarProducoes();
  }, []);

  const carregarProducoes = async () => {
    try {
      const response = await agricultoresService.listarProducoes();
      setLista(response.data);
    } catch (error) {
      console.error("Erro ao listar:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "quantidadeSementes" || name === "preco" ? Number(value) : value,
    });
  };

  // --- 1. FUNÇÃO DE PREPARAR EDIÇÃO ---
  // Pega os dados da linha da tabela e joga no formulário
  const handleEdit = (item: IProducaoSementes) => {
    setFormData({
      tipoSemente: item.tipoSemente,
      quantidadeSementes: item.quantidadeSementes,
      preco: item.preco,
      validade: item.validade, 
    });
    setEditandoId(item.id || null); // Guarda o ID separadamente
    
    // Rola a tela para cima
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- 2. FUNÇÃO DE CANCELAR ---
  // Limpa tudo se o usuário desistir
  const handleCancel = () => {
    setEditandoId(null);
    setFormData({ tipoSemente: "", quantidadeSementes: 0, preco: 0, validade: "" });
  };

  // --- 3. SUBMIT INTELIGENTE (CRIAR OU ATUALIZAR) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editandoId) {
        // --- MODO EDIÇÃO ---
        // Aqui usamos o ID que estava guardado + os dados do formulário
        await agricultoresService.atualizarProducao(editandoId, formData);
        alert("Produção atualizada com sucesso!");
      } else {
        // --- MODO CRIAÇÃO ---
        // Aqui mandamos só os dados (o ID é gerado no banco)
        await agricultoresService.criarProducao(formData);
        alert("Produção cadastrada com sucesso!");
      }

      carregarProducoes(); // Atualiza a lista
      handleCancel(); // Limpa o formulário e sai do modo edição
      
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar. Verifique o console.");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta produção?")) {
      try {
        await agricultoresService.deletarProducao(id);
        carregarProducoes();
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>Gestão de Produção de Sementes</h1>

      {/* --- FORMULÁRIO --- */}
      <div style={{ background: "#f4f4f4", padding: "20px", borderRadius: "8px", marginBottom: "30px" }}>
        {/* Muda o título dependendo do modo */}
        <h3>{editandoId ? "Editar Produção" : "Nova Produção"}</h3>
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
          
          <label>Tipo da Semente:</label>
          <input type="text" name="tipoSemente" value={formData.tipoSemente} onChange={handleChange} required placeholder="Ex: Milho..." style={{ padding: "8px" }} />

          <label>Quantidade:</label>
          <input type="number" name="quantidadeSementes" value={formData.quantidadeSementes} onChange={handleChange} required style={{ padding: "8px" }} />

          <label>Preço (R$):</label>
          <input type="number" step="0.01" name="preco" value={formData.preco} onChange={handleChange} required style={{ padding: "8px" }} />

          <label>Validade:</label>
          <input type="date" name="validade" value={formData.validade} onChange={handleChange} required style={{ padding: "8px" }} />

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            {/* Botão Principal: Muda cor e texto */}
            <button type="submit" style={{ flex: 1, padding: "10px", background: editandoId ? "blue" : "green", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>
              {editandoId ? "Atualizar" : "Salvar"}
            </button>
            
            {/* Botão Cancelar: Só aparece se estiver editando */}
            {editandoId && (
              <button type="button" onClick={handleCancel} style={{ flex: 1, padding: "10px", background: "#999", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>
                Cancelar
              </button>
            )}
          </div>

        </form>
      </div>

      {/* --- TABELA --- */}
      <h3>Sementes Cadastradas</h3>
      <table border={1} cellPadding={10} style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr style={{ background: "#ddd" }}>
            <th>ID</th>
            <th>Tipo</th>
            <th>Qtd</th>
            <th>Preço</th>
            <th>Validade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {lista.length === 0 ? (
            <tr><td colSpan={6} style={{ textAlign: "center" }}>Nenhuma produção encontrada.</td></tr>
          ) : (
            lista.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.tipoSemente}</td>
                <td>{item.quantidadeSementes}</td>
                <td>R$ {item.preco}</td>
                <td>{item.validade}</td>
                <td>
                  <div style={{ display: "flex", gap: "5px" }}>
                    {/* BOTÃO DE EDITAR */}
                    <button 
                        onClick={() => handleEdit(item)}
                        style={{ background: "orange", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "4px" }}
                    >
                        Editar
                    </button>

                    {/* BOTÃO DE EXCLUIR */}
                    <button 
                        onClick={() => item.id && handleDelete(item.id)}
                        style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "4px" }}
                    >
                        Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
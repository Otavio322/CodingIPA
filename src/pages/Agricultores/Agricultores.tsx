import React, { useEffect, useState } from "react";
import { agricultoresService } from "../../services/agricultoresService";
import { Agricultor } from "../../types/Agricultor";

export default function AgricultoresPage() {
  const [agricultores, setAgricultores] = useState<Agricultor[]>([]);

  useEffect(() => {
    const carregarAgricultores = async () => {
      try {
        const response = await agricultoresService.listar();
        setAgricultores(response.data);
      } catch (error) {
        console.error("Erro ao carregar agricultores:", error);
      }
    };

    carregarAgricultores();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Lista de Agricultores</h1>
      <ul>
        {agricultores.map((agricultor) => (
          <li key={agricultor.cpfCnpj}>
            <strong>{agricultor.nome}</strong> — {agricultor.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
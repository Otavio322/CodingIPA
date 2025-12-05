import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
  RefreshCcw, Plus, Edit, Trash2, X, AlertTriangle, Save, Sunrise, CheckCircle 
} from 'lucide-react';

// CORREÇÃO: A rota foi alterada para refletir o Controller do backend: /api/producao-sementes (singular)
const API_BASE_URL = 'http://localhost:8080/api/producao-sementes';

// 1. Definição da Interface (Tipagem) para a entidade
interface IProducaoSementes {
  id?: number; // O ID é opcional ao criar um novo registro
  tipoSemente: string;
  quantidadeSementes: number;
  preco: number;
  validade: string; // Armazenado como string (formato Date do input HTML)
}

// Objeto default tipado
const defaultSeed: IProducaoSementes = {
  tipoSemente: '',
  quantidadeSementes: 0,
  preco: 0.0,
  validade: '',
};

// 2. Tipagem para Props do Componente Notification
interface NotificationProps {
  message: string | null;
  type: 'success' | 'error';
  onClose: () => void;
}

// Componente para Notificações (Toast)
const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const Icon = type === 'success' ? CheckCircle : AlertTriangle;

  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white flex items-center ${bgColor}`}>
      <Icon className="w-5 h-5 mr-2" />
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// 3. Tipagem para Props do Componente ConfirmationModal
interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

// Componente para o Modal de Confirmação (Substitui confirm())
const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition"
          >
            Confirmar Exclusão
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente Principal convertido para TSX
export default function ProducaoSementesPage() {
  // 4. Tipagem dos estados: lista de produções
  const [producoes, setProducoes] = useState<IProducaoSementes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  // Estado para mensagens e erros
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<NotificationProps>({ message: null, type: 'success', onClose: () => {} });

  // Estado para o formulário de Adicionar/Editar
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentSeed, setCurrentSeed] = useState<IProducaoSementes>(defaultSeed);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Estado para Confirmação de Exclusão
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [seedToDelete, setSeedToDelete] = useState<IProducaoSementes | null>(null);

  // Função para limpar todas as mensagens
  const clearMessages = (): void => {
    setError(null);
    setNotification({ message: null, type: 'success', onClose: () => {} });
  };
  
  // --- Funções de Requisição (CRUD) ---

  // 1. GET - Listar todas as produções
  const fetchProducoes = useCallback(async () => {
    setLoading(true);
    clearMessages();
    try {
      const response = await axios.get<IProducaoSementes[]>(API_BASE_URL);
      setProducoes(response.data);
    } catch (err) {
      setError('Falha ao carregar as produções. Verifique o backend.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. POST / PUT - Salvar (Adicionar ou Editar)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    clearMessages();

    // O backend Spring Boot espera um objeto coerente com o DTO/Model.
    // Garantimos que os tipos numéricos sejam passados corretamente.
    const dataToSend = {
      ...currentSeed,
      quantidadeSementes: Number(currentSeed.quantidadeSementes),
      preco: Number(currentSeed.preco),
    };

    try {
      if (isEditing) {
        // PUT: Atualiza um registro existente
        await axios.put(`${API_BASE_URL}/${currentSeed.id}`, dataToSend);
        setNotification({ 
            message: 'Produção atualizada com sucesso!', 
            type: 'success', 
            onClose: clearMessages 
        });
      } else {
        // POST: Cria um novo registro
        await axios.post(API_BASE_URL, dataToSend);
        setNotification({ 
            message: 'Nova produção cadastrada com sucesso!', 
            type: 'success', 
            onClose: clearMessages 
        });
      }
      
      // Fechar modal e atualizar a lista
      setIsModalOpen(false);
      fetchProducoes(); 
    } catch (err) {
      setError(`Falha ao salvar a produção: ${axios.isAxiosError(err) ? err.response?.data?.message || err.message : 'Erro desconhecido'}.`);
      console.error("Erro ao salvar:", axios.isAxiosError(err) ? err.response || err : err);
    } finally {
      setLoading(false);
    }
  };

  // 3. DELETE - Excluir
  const confirmDelete = (seed: IProducaoSementes) => {
    setSeedToDelete(seed);
    setIsConfirmModalOpen(true);
  };
  
  const handlePerformDelete = async () => {
    if (!seedToDelete || seedToDelete.id === undefined) return;

    setIsConfirmModalOpen(false); // Fechar o modal
    setLoading(true);
    clearMessages();

    try {
      await axios.delete(`${API_BASE_URL}/${seedToDelete.id}`);
      setNotification({ 
        message: 'Produção excluída com sucesso!', 
        type: 'success', 
        onClose: clearMessages 
      });
      fetchProducoes(); // Atualiza a lista
    } catch (err) {
      setError(`Falha ao excluir a produção: ${axios.isAxiosError(err) ? err.response?.data?.message || err.message : 'Erro desconhecido'}`);
      console.error("Erro ao excluir:", axios.isAxiosError(err) ? err.response || err : err);
    } finally {
      setLoading(false);
      setSeedToDelete(null);
    }
  };
  
  // --- Funções de UI ---

  // Carrega os dados ao montar o componente
  useEffect(() => {
    fetchProducoes();
  }, [fetchProducoes]);

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentSeed(defaultSeed);
    setIsModalOpen(true);
  };

  const openEditModal = (seed: IProducaoSementes) => {
    setIsEditing(true);
    // Formata a data de volta para o formato de input (YYYY-MM-DD)
    setCurrentSeed({ 
        ...seed, 
        // Garantir que 'validade' não seja nula antes de tentar formatar
        validade: seed.validade ? new Date(seed.validade).toISOString().substring(0, 10) : '' 
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentSeed(defaultSeed);
  };

  // Estrutura de estilo base em Tailwind CSS para melhor visualização
  return (
    <>
    <style jsx global>{`
        body {
            background-color: #f3f4f6;
            font-family: 'Inter', sans-serif;
        }
    `}</style>
    <div className="min-h-screen p-4 sm:p-8">
      
      {/* Notificação de Sucesso/Erro */}
      <Notification 
        message={notification.message} 
        type={notification.type} 
        onClose={clearMessages} // Usa clearMessages diretamente
      />

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="text-3xl font-bold text-green-700 flex items-center">
            <Sunrise className="w-8 h-8 mr-3 text-yellow-500" />
            Gerenciamento de Produção de Sementes
          </h1>
          <div className="flex space-x-3">
            <button
              onClick={fetchProducoes}
              className="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition duration-150"
              title="Atualizar Lista"
              disabled={loading}
            >
              <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={openAddModal}
              className="flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition duration-150"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nova Produção
            </button>
          </div>
        </div>

        {/* Mensagens de Erro */}
        {loading && <p className="text-center text-blue-500 font-semibold mb-4">Carregando dados...</p>}
        {error && (
          <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 mb-4 rounded-md flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {/* Tabela de Dados */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Semente</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço (R$)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validade</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {producoes.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} className="px-4 py-4 text-center text-gray-500">Nenhuma produção de semente cadastrada.</td>
                </tr>
              )}
              {producoes.map((seed) => (
                <tr key={seed.id} className="hover:bg-green-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{seed.id}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{seed.tipoSemente}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{seed.quantidadeSementes}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(seed.preco)}
                  </td>
                  {/* Garantir que a data seja exibida em formato amigável */}
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    {seed.validade && new Date(seed.validade).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => openEditModal(seed)}
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50 transition"
                        title="Editar"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => confirmDelete(seed)}
                        className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition"
                        title="Excluir"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Cadastro/Edição */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {isEditing ? 'Editar Produção' : 'Cadastrar Nova Produção'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label htmlFor="tipoSemente" className="block text-sm font-medium text-gray-700">Tipo de Semente</label>
                <input
                  type="text"
                  id="tipoSemente"
                  value={currentSeed.tipoSemente}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentSeed({ ...currentSeed, tipoSemente: e.target.value })}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label htmlFor="quantidadeSementes" className="block text-sm font-medium text-gray-700">Quantidade (unidades)</label>
                <input
                  type="number"
                  id="quantidadeSementes"
                  // Valor convertido para string para o input type="number"
                  value={currentSeed.quantidadeSementes.toString()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentSeed({ ...currentSeed, quantidadeSementes: Number(e.target.value) || 0 })}
                  required
                  min="0"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label htmlFor="preco" className="block text-sm font-medium text-gray-700">Preço (R$)</label>
                <input
                  type="number"
                  id="preco"
                  // Valor convertido para string para o input type="number"
                  value={currentSeed.preco.toString()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentSeed({ ...currentSeed, preco: Number(e.target.value) || 0 })}
                  required
                  step="0.01"
                  min="0"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label htmlFor="validade" className="block text-sm font-medium text-gray-700">Validade</label>
                <input
                  type="date"
                  id="validade"
                  value={currentSeed.validade}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentSeed({ ...currentSeed, validade: e.target.value })}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                  disabled={loading}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? 'Salvar Alterações' : 'Cadastrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmação (para o DELETE) */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        title="Confirmar Exclusão"
        message={`Você tem certeza que deseja excluir a produção de ${seedToDelete?.tipoSemente || 'esta semente'} (ID: ${seedToDelete?.id})? Esta ação não pode ser desfeita.`}
        onConfirm={handlePerformDelete}
        onCancel={() => {
          setIsConfirmModalOpen(false);
          setSeedToDelete(null);
        }}
      />
    </div>
    </>
  );
}
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router'; // Importando useRouter
import styles from '../styles/Login.module.css';

export default function Login() {
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Declarando o router para navegação

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Limpa erro antigo

    try {
      // Envia os dados para o login
      const { data } = await axios.post(
        'http://localhost:8080/api/auth/login',
        { cpfCnpj, senha },
        { validateStatus: (status) => status < 500 }
      );

      // Se o login for bem-sucedido
      if (data.sucesso) {
        // Redireciona para a página de boas-vindas ou dashboard
        router.push(`/welcome?user=${encodeURIComponent(cpfCnpj)}`);
      } else {
        // Caso o backend retorne sucesso=false
        setError(data.mensagem);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ mensagem: string }>;
        if (axiosErr.response?.data?.mensagem) {
          setError(axiosErr.response.data.mensagem);
        } else {
          setError('Erro na conexão com o servidor');
        }
      } else {
        setError('Erro inesperado');
      }
    }
  };

  const handleGoToProducoes = () => {
    // Aqui você coloca o código para navegar para a página de "Produção de Sementes"
    router.push("/producoes/producaosementes");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="CPF/CNPJ"
          value={cpfCnpj}
          onChange={(e) => setCpfCnpj(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Entrar</button>
      </form>

      {/* Botão para ir para a página de Produção de Sementes */}
      <div>
        <button onClick={handleGoToProducoes}>Gerenciar Produção de Sementes</button>
      </div>
    </div>
  );
}

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';

export default function Login() {
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar se o login foi bem-sucedido
  const router = useRouter();

  // Função chamada ao enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Limpa erros anteriores

    try {
      // Envia dados para autenticação
      const { data } = await axios.post(
        'http://localhost:8080/api/auth/login', // Atualize a URL se necessário
        { cpfCnpj, senha }, // Envia CPF/CNPJ e senha para autenticação
        { validateStatus: (status) => status < 500 }
      );

      // Se o login for bem-sucedido
      if (data.sucesso) {
        localStorage.setItem('jwt', data.token); // Salva o token no localStorage
        setIsLoggedIn(true); // Atualiza o estado para exibir o botão
        router.push(`/welcome?user=${encodeURIComponent(cpfCnpj)}`); // Redireciona para a página de boas-vindas
      } else {
        // Se falhar, exibe a mensagem de erro
        setError(data.mensagem);
      }
    } catch (err) {
      // Lida com erros de conexão ou outros tipos de erro
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

  // Função chamada ao clicar no botão para ir à página de Produção de Sementes
  const handleGoToProducoes = () => {
    router.push('/producoes/producaosementes'); // Redireciona para a página de Produção de Sementes
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
        {error && <p className={styles.error}>{error}</p>} {/* Exibe erro se houver */}
        <button type="submit">Entrar</button>
      </form>

      {/* Exibe o botão "Gerenciar Produção de Sementes" apenas após o login bem-sucedido */}
      {isLoggedIn && (
        <div>
          <button onClick={handleGoToProducoes}>Gerenciar Produção de Sementes</button>
        </div>
      )}
    </div>
  );
}

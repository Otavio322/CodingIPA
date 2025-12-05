<<<<<<< HEAD
# Front-end de Login com Next.js, React e TypeScript

Este projeto é um exemplo de **tela de login** construída com Next.js (Pages Router), React e TypeScript, que se comunica com um backend via API REST utilizando **axios**. Após autenticar com sucesso, o usuário é redirecionado para uma página de boas-vindas.

## 📁 Estrutura de Diretórios

```bash
my-project/
├── src/                 # código auxiliar, hooks, components, etc.
      ├── pages/
      │   ├── index.tsx        # Tela de Login
      │   └── welcome.tsx      # Tela de Boas-vindas pós-login
      ├── styles/
      │   └── Login.module.css # Estilos em CSS Modules para a página de login
├── public/              # Imagens, favicon e ativos estáticos
├── .gitignore
├── next.config.ts       # Configurações do Next.js
├── package.json
├── tsconfig.json        # Configurações do TypeScript
└── README.md
```

## 🚀 Pré-requisitos

* **Node.js** (versão 14 ou superior)
* **npm** (ou **yarn**)
* Backend disponível em `http://localhost:8080/api/auth/login`

  * Deve aceitar requisição POST com payload `{ nomeUsuario, senha }` e devolver JSON:

    ```jsonc
    // Sucesso
    { "sucesso": true, "mensagem": "Login bem-sucedido" }

    // Falha (ex: credenciais inválidas)
    { "sucesso": false, "mensagem": "Credenciais inválidas" }
    ```

## ⚙️ Instalação e Execução

1. Clone este repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd my-project
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Abra no navegador:

   ```
   http://localhost:3000
   ```

## 🔄 Fluxo de Login

1. Acesse `http://localhost:3000` e preencha **Usuário** e **Senha**.
2. Ao clicar em **Entrar**, faz-se um `POST` para `http://localhost:8080/api/auth/login` via axios.
3. Se o backend responder `{ sucesso: true }`, o usuário é redirecionado para `/welcome?user=<nome>`.
4. Se `{ sucesso: false }`, a mensagem de erro retornada (`mensagem`) é exibida em tela.


## 🛠️ Principais Tecnologias

* [Next.js](https://nextjs.org/) (Pages Router)
* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Axios](https://axios-http.com/)
* CSS Modules

---

## 📝 Customização

* **URL do backend**: altere em `pages/index.tsx` conforme necessário.
* **Estilos**: ajuste `styles/Login.module.css` para outras cores, fontes ou layout.
* **Rotas**: adicione novas páginas em `pages/` seguindo a convenção `<nome>.tsx`.

---

> **Dica:** para produção, configure variáveis de ambiente (`.env.local`) e use `NEXT_PUBLIC_API_URL` em vez de código fixo.


=======
Projeto de Distribuição de Sementes

Este projeto visa otimizar o processo de distribuição de sementes para agricultores, gerenciando informações sobre cooperativas, transportadoras e agricultores através de uma plataforma web com back-end em Java e front-end em React.

Tecnologias Utilizadas
Back-End

Java 17

Spring Boot (para a construção da API RESTful)

Spring Security (para autenticação)

Spring Data JPA (para acesso ao banco de dados)

H2 Database (Banco de dados em memória para testes)

Hibernate (ORM para mapeamento objeto-relacional)

Front-End

React (para a construção da interface do usuário)

Axios (para comunicação com a API REST)

React Router (para navegação entre páginas)

Bootstrap (para estilização)

Descrição do Projeto

O sistema de Distribuição de Sementes permite que os agricultores se conectem com cooperativas e transportadoras para a distribuição de sementes. O back-end gerencia dados de agricultores, cooperativas, transportadoras, e transporte de sementes. O front-end oferece uma interface interativa para os usuários interagirem com esses dados.

Estrutura do Projeto

Backend (Java / Spring Boot):

A API RESTful é responsável por gerenciar as informações de agricultores, cooperativas, transportadoras, e transporte de sementes.

Controller gerencia as requisições HTTP e interage com a camada de Service.

Repository faz a interação com o banco de dados usando o Spring Data JPA.

Frontend (React):

Interface para o usuário interagir com a API.

Exibe informações dos agricultores, cooperativas, transportadoras, e permite ações como criar, atualizar, excluir, e consultar.

Configuração do Projeto
1. Configuração do Back-End (Java / Spring Boot)

Clone o repositório:

git clone https://github.com/usuario/projeto-distribuicao-sementes-backend.git
cd projeto-distribuicao-sementes-backend


Instalar dependências do projeto:
O back-end usa o Maven para gerenciamento de dependências. Se você não tem o Maven instalado, baixe e instale a partir de aqui
.

Para instalar as dependências e rodar o projeto:

mvn clean install


Configurar o banco de dados (H2):
O banco de dados H2 é utilizado por padrão para desenvolvimento. O H2 é em memória, o que significa que os dados são perdidos sempre que o servidor é reiniciado.

Rodar o back-end:
Você pode rodar o back-end com o comando:

mvn spring-boot:run


O servidor estará disponível em http://localhost:8080
.

2. Configuração do Front-End (React)

Clone o repositório do front-end:

git clone https://github.com/usuario/projeto-distribuicao-sementes-frontend.git
cd projeto-distribuicao-sementes-frontend


Instalar as dependências do front-end:
No diretório do front-end, execute o comando para instalar as dependências do projeto:

npm install


Rodar o front-end:
Depois de instalar as dependências, você pode rodar o projeto com:

npm start


O front-end estará disponível em http://localhost:3000
.

Endpoints da API

Aqui estão os principais endpoints da API RESTful para interagir com o sistema de distribuição de sementes.

1. Agricultores

GET /api/agricultores: Recupera todos os agricultores.

GET /api/agricultores/{cpfCnpj}: Recupera informações de um agricultor pelo CPF/CNPJ.

POST /api/agricultores: Cria um novo agricultor.

PUT /api/agricultores/{cpfCnpj}: Atualiza os dados de um agricultor.

DELETE /api/agricultores/{cpfCnpj}: Exclui um agricultor pelo CPF/CNPJ.

2. Transportadora

GET /api/transportadora: Recupera todas as transportadoras.

POST /api/transportadora: Cria uma nova transportadora.

PUT /api/transportadora/{id}: Atualiza os dados de uma transportadora.

DELETE /api/transportadora/{id}: Exclui uma transportadora pelo ID.

3. Cooperativas

GET /api/cooperativas: Recupera todas as cooperativas.

POST /api/cooperativas: Cria uma nova cooperativa.

4. Transporte de Sementes

POST /api/transportesementes: Cria um novo transporte de sementes.

GET /api/transportesementes: Recupera todos os transportes de sementes.

Integração Front-End e Back-End

O front-end em React faz chamadas GET, POST, PUT, e DELETE para os endpoints do back-end em Java/Spring Boot usando Axios para enviar as requisições.

No front-end, a interface permite ao usuário adicionar, editar e excluir Agricultores, Transportadoras, e outros dados relacionados.

Exemplo de Requisição no Front-End (React):
import axios from 'axios';

const criarAgricultor = async (agricultor) => {
  try {
    const response = await axios.post('http://localhost:8080/api/agricultores', agricultor);
    console.log(response.data); // Dados retornados do back-end
  } catch (error) {
    console.error("Erro ao criar agricultor:", error);
  }
};

Conclusão

O back-end gerencia dados de Agricultores, Transportadoras, e Cooperativas, com endpoints para CRUD (Create, Read, Update, Delete).

O front-end em React interage com a API RESTful do back-end, permitindo que os usuários realizem operações no sistema.

Certifique-se de que tanto o front-end quanto o back-end estejam rodando corretamente antes de fazer a demonstração.

Agora, você pode seguir com a integração e testes para garantir que tudo funcione bem até a apresentação! Se precisar de mais ajuda ou ajustes, é só avisar.

GRUPO:

DANIEL CABRAL

SABRINA BEATRIZ

IAN GABRIEL

MARCELO BEZERRA

MARCELO MARTINS

OTÁVIO AUGUSTO
>>>>>>> 63779e2fc6256cf275ce398387153f83fb5f8f4e

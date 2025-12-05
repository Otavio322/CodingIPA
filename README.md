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

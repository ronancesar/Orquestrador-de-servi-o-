# Orquestrador-de-serviço
API de orquestração em Node.js demonstrando integrações, Docker, Postgres (Sequelize), MongoDB e Testes Unitários.

# Smart-Integrator: API de Orquestração de Serviços

Projeto de portfólio desenvolvido com o objetivo de simular os desafios de uma "Squad de Integrações". Esta API atua como um serviço de orquestração que recebe uma requisição, consome APIs de parceiros (simuladas) e persiste os resultados em bancos de dados relacionais e não-relacionais.

O projeto foi construído especificamente para demonstrar proficiência nas tecnologias e arquiteturas solicitadas em vagas de Backend, cobrindo todo o ciclo de desenvolvimento, desde a lógica de negócio até a containerização e testes.

## Arquitetura Aplicada

Foi utilizada uma **Arquitetura em Camadas (Layered Architecture)** para garantir a **Separação de Responsabilidades (SoC)** e facilitar a manutenção e os testes:

* **Controllers:** Responsáveis por receber e responder requisições HTTP.
* **Services:** "Cérebro" da aplicação, contém toda a lógica de negócio (ex: regra de aprovação/reprovação) e orquestra as chamadas aos parceiros e repositórios.
* **Repositories:** Única camada com permissão para "falar" com os bancos de dados, abstraindo a lógica de persistência.

## Hard Skills Demonstradas

Este projeto cobre um stack completo de backend, demonstrando:

* **Node.js + Express:** Construção da API RESTful.
* **Orientação a Objetos:** Design em camadas (Controller, Service, Repository).
* **Consumo de APIs:** Orquestração de chamadas (simuladas) a serviços externos (Anti-Fraude, Motor de Crédito).
* **Banco de Dados Relacional (PostgreSQL + Sequelize):** Modelagem e persistência do resultado final da análise (`Analysis.js`).
* **Banco de Dados Não-Relacional (MongoDB):** Persistência de dados não-estruturados (Logs de cada etapa do processo).
* **Containerização (Docker):** Ambiente 100% containerizado com **3 serviços** (API, DB Postgres, DB Mongo) gerenciados pelo `docker-compose.yml`.
* **Testes Unitários (Jest):** Testes focados na lógica de negócio (`orderService`), "mockando" as dependências (bancos e logs) para garantir o isolamento.
* **Git (Bitbucket):** Todo o projeto foi versionado seguindo boas práticas.

---

## 🚀 Como Rodar o Projeto (Ambiente Docker)

**Pré-requisito:** Você precisa ter o **Docker Desktop** instalado e rodando.

1.  Clone este repositório:
    ```bash
    git clone [URL-DO-SEU-REPOSITÓRIO-BITBUCKET]
    cd node-modulos
    ```

2.  Suba todo o ambiente (API + Banco Postgres + Banco Mongo) com um único comando:
    ```bash
    docker-compose up --build
    ```

3.  A API estará rodando em `http://localhost:3000`.

## 🧪 Como Rodar os Testes Unitários

1.  Certifique-se de que os contêineres Docker **não** estão rodando (`Ctrl + C` no terminal do Docker).
2.  Instale as dependências de desenvolvimento localmente:
    ```bash
    npm install
    ```
3.  Execute os testes:
    ```bash
    npm test
    ```

---

## Endpoints da API

### Análise de Pedido

Envia um pedido para ser processado pelo motor de análise (anti-fraude e crédito).

* **Método:** `POST`
* **URL:** `http://localhost:3000/api/v1/order-analysis`

#### Body da Requisição (JSON)

```json
{
  "customerId": "cliente-abc-123",
  "orderValue": 500.00
}

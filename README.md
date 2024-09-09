# Projeto Integrador: Sistema WEB

Disciplina da 4ª fase do curso de Engenharia de Software, visa a construção de um portal de acesso para os clientes da empresa Startec Engenharia. Neste portal, os clientes poderão visualizar o andamento do conserto/garantia dos equipamentos.

## Integrantes
- Augusto Preis Tomasi
- Giovanni Zanette Meller
- Luíza Arend da Silva

## Tecnologias utilizadas

#### Frontend
- React.js
- Ant Design

#### Backend
- Node.js
- Typescript
- Express.js

#### Banco de Dados
- PostgreSQL

#### Como rodar o projeto

##### Pré requisitos:
Node.js (>= 18)

- Criar arquivo .env dentro da pasta `backend`, com os seguintes dados:
```
# Alterar dados (xxxxx) conforme necessário
DB_HOST=xxxxx
DB_USER=xxxxx
DB_PASS=xxxxx
DB_NAME=xxxxx
DB_PORT=xxxxx
PORT=3000
```
- Abrir um cmd, e rodar os seguintes comandos na pasta raiz do projeto
```
cd backend
npm install
npm start
```
- Abrir outro cmd, e rodar os seguintes comandos na pasta raiz do projeto
```
cd frontend
npm install
npm run dev
```
Obs: os terminais precisam continuar abertos após a execução dos comandos

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
# Alterar dados abaixo conforme necessário

#Porta do sistema (Evitar alterar)
PORT=3000

#Host do DB
DB_HOST=

#Usuário do DB
DB_USER=

#Login do DB
DB_NAME=

#Senha do DB
DB_PASS=

#Porta do DB
DB_PORT=

#Hash aleatória para o JWT
JWT_TOKEN=JFiFNSnf0SNand91M8nf

#Tempo de duração do login (1d até 365d)
JWT_EXPIRE=1d

#Ambiente de execução (DEV | PROD)
NODE_ENV=

#Mostrar mensagens de log (TRUE | FALSE)
LOGGER=TRUE

#Mostrar log dos SQL's executados (TRUE | FALSE)
LOG_SQL=FALSE
```
- Executar os scripts de banco, localizados [`aqui`](backend/src/config/startup.sql)
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
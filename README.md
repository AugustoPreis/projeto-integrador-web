# Projeto Integrador: Sistema WEB

Disciplina da 4ª fase do curso de Engenharia de Software, visa a construção de um portal de acesso para os clientes da empresa Startec Engenharia. Neste portal, os clientes poderão visualizar o andamento do conserto/garantia dos equipamentos.

## Integrantes
- Augusto Preis Tomasi
- Giovanni Zanette Meller
- Maria Luíza Arend da Silva

## Tecnologias utilizadas

#### Frontend
- React.js: Biblioteca de interfaces front-end
- Ant Design: Framework de estilos

#### Backend
- Node.js: Permite a execução do javascript pelo lado do servidor
- Typescript: Superset do Javascript
- Express.js: Framework de rotas do Node.js

#### Banco de Dados
- PostgreSQL

#### Como rodar o projeto

##### Pré requisitos:
- Docker

- Criar um arquivo chamado `.env` dentro da pasta `backend`, com os seguintes dados:
```
# Alterar dados abaixo conforme necessário

#Porta do sistema
#A alteração desse valor resultará em erros de conexão, caso não seja configurada corretamente no resto do servidor
PORT=3000

#Dados da conexão com o banco
#O banco é criado no momento em que o servidor inicia
DB_HOST=localhost
DB_USER=postgres
DB_NAME=portalstartec
DB_PASS=admin
DB_PORT=5432

#Hash aleatória para o JWT, pode ser qualquer valor
#A alteração desse valor resultará em problemas no cliente e funcionário inserido automaticamente pelo sistema
JWT_TOKEN=JFiFNSnf0SNand91M8nf

#Chave de encriptação de senhas
#A alteração desse valor resultará em problemas no cliente e funcionário inserido automaticamente pelo sistema
AES_256_CBC_KEY=3L4Fiz2FPFFnyyfMZwueGw==

#Tempo de duração do login (1d até 365d)
JWT_EXPIRE=1d

#Ambiente de execução (DEV | PROD)
NODE_ENV=DEV

#Mostrar mensagens de log (TRUE | FALSE)
LOGGER=TRUE

#Mostrar log dos SQL's executados (TRUE | FALSE)
LOG_SQL=FALSE
```
- Na pasta raiz do projeto, rodar o seguinte comando: `docker compose up --build`

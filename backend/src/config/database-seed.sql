CREATE TABLE funcao (
	id serial NOT NULL PRIMARY KEY,
	descricao varchar(100) NOT NULL
);

CREATE TABLE funcionario (
	id serial NOT NULL PRIMARY KEY,
	nome varchar(150) NOT NULL,
	login varchar(100) NOT NULL,
	senha text NOT NULL,
	ativo bool DEFAULT TRUE NOT NULL,
	adm bool DEFAULT FALSE NOT NULL,
	funcao int NOT NULL REFERENCES funcao
);

CREATE TABLE cliente (
	id serial NOT NULL PRIMARY KEY,
	nome varchar(150) NOT NULL,
	telefone varchar(20) NULL,
	email varchar(100) NULL,
	login varchar(100) NOT NULL,
	senha text NOT NULL,
	ativo bool DEFAULT true NOT NULL,
	inicio_acesso timestamp NOT NULL,
	fim_acesso timestamp NULL
);

CREATE TABLE produto (
	id serial NOT NULL PRIMARY KEY,
	nome varchar(150) NOT NULL,
	descricao TEXT,
	valor numeric(10, 2) NOT NULL,
	ativo bool DEFAULT TRUE NOT NULL
);

CREATE TABLE tipo_servico (
	id serial NOT NULL PRIMARY KEY,
	descricao varchar(100) NOT NULL,
	pagador char(1) NOT NULL DEFAULT 'C'
);

CREATE TABLE servico (
	id serial NOT NULL PRIMARY KEY,
	numero int NOT NULL UNIQUE,
	descricao varchar(150) NOT NULL,
	observacao TEXT NULL,
	valor numeric(10, 2),
	cliente int NOT NULL REFERENCES cliente,
	produto int NOT NULL REFERENCES produto,
	tipo_servico int NOT NULL REFERENCES tipo_servico,
	data_cadastro timestamp NOT NULL DEFAULT current_timestamp,
	ativo bool DEFAULT TRUE NOT NULL
);

CREATE TABLE servico_funcionario (
	id serial NOT NULL PRIMARY KEY,
	servico int NOT NULL REFERENCES servico,
	funcionario int NOT NULL REFERENCES funcionario,
	data_cadastro timestamp NOT NULL DEFAULT current_timestamp,
	status varchar(20) NOT NULL,
	observacao varchar(250) NULL
);

INSERT INTO funcao VALUES
	(DEFAULT, 'Administrador'),
	(DEFAULT, 'Gerente'),
	(DEFAULT, 'Engenheiro'),
	(DEFAULT, 'Mecânico'),
	(DEFAULT, 'Contador');
	
INSERT INTO funcionario VALUES
	(DEFAULT, 'ADMIN', 'admin', '$2b$10$BMhXM3E8B7u2ksp2hjz72u4oSoIVQXu8Rak3xJLbUya8YrCpVnD6W', TRUE, TRUE, 1);
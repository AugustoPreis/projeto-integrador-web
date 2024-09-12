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

INSERT INTO funcao VALUES
	(DEFAULT, 'Gerente'),
	(DEFAULT, 'Engenheiro'),
	(DEFAULT, 'Mecânico'),
	(DEFAULT, 'Administrador'),
	(DEFAULT, 'Contador');
	
INSERT INTO funcionario VALUES
	(DEFAULT, 'SISTEMA', 'sistema', '$2b$10$EnwBQKjJ2VMIGyVL9Quh5ebSQynUJTNt4I179wPKPMip/mIikB5sq', TRUE, TRUE, 1);

INSERT INTO cliente VALUES
	(DEFAULT, 'Cliente 1', '99999999999', 'cliente1@gmail.com', 'cliente1', '$2b$10$EnwBQKjJ2VMIGyVL9Quh5ebSQynUJTNt4I179wPKPMip/mIikB5sq', TRUE, current_timestamp);
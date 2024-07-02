package com.iridium.plugins

import io.ktor.server.application.*
import org.jetbrains.exposed.sql.*

//DROP TABLE IF EXISTS disciplina;
//CREATE TABLE disciplina(
//    id SERIAL PRIMARY KEY,
//    name VARCHAR(50),
//    docente VARCHAR(50),
//    sigla VARCHAR(50),
//    apelido VARCHAR(50),
//    andamento BOOLEAN DEFAULT TRUE,
//    token VARCHAR(50)
//);
//INSERT INTO disciplina (name, docente, sigla, apelido, andamento, token)
//    VALUES ('calculo', 'zara', 'MAT0123', 'calcpi', FALSE, '1');
//INSERT INTO disciplina (name, docente, sigla, apelido, token)
//    VALUES ('software', 'paulo', 'MAC0456', 'labjef', '2');
//
//DROP TABLE IF EXISTS atividade;
//CREATE TABLE atividade(
//    id SERIAL PRIMARY KEY,
//    name VARCHAR(50),
//    descricao VARCHAR(50),
//    tipo VARCHAR(10),
//    concluido BOOLEAN DEFAULT FALSE,
//    disciplina VARCHAR(50),
//    prazo DATE,
//    token VARCHAR(50)
//);
//INSERT INTO atividade (name, descricao, tipo, prazo, disciplina, token)
//    VALUES ('projeto iridium', 'entregar segunda', 'Prova', '2024-07-14', 'software', '1');
//INSERT INTO atividade (name, descricao, tipo, concluido, prazo, disciplina, token)
//    VALUES ('lista', 'exercicio 2', 'Tarefa', TRUE, '2025-04-20', 'calculo', '2');
//
//DROP TABLE IF EXISTS usuario;
//CREATE TABLE usuario(
//    id SERIAL PRIMARY KEY,
//    nome VARCHAR(50),
//    email VARCHAR(50),
//    senha VARCHAR(50)
//);
//
//INSERT INTO usuario (nome, email, senha)
//    VALUES('bea', 'bea@usp', '1234');
//
//INSERT INTO usuario (nome, email, senha)
//  VALUES('may', 'may@usp', '567');


fun Application.configureDatabases() {
    Database.connect(
        "jdbc:postgresql://localhost:5432/iridium_db",
//        driver = "org.postgresql.Driver",
        user = "postgres",  
        password = "bancodados"
//        password = "Bibi2004!"
    )
}
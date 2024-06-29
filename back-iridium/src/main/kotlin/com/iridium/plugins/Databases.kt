package com.iridium.plugins

import io.ktor.server.application.*
import org.jetbrains.exposed.sql.*

//DROP TABLE IF EXISTS disciplina;
//CREATE TABLE disciplina(	//CREATE TABLE disciplina(
//    id SERIAL PRIMARY KEY,	//    id SERIAL PRIMARY KEY,
//    name VARCHAR(50),	//    name VARCHAR(50),
//    docente VARCHAR(50),	//    docente VARCHAR(50),
//    sigla VARCHAR(50),	//    sigla VARCHAR(50),
//    apelido VARCHAR(50)	//    apelido VARCHAR(50)
//);	//);
//INSERT INTO disciplina (name, docente, sigla, apelido)	//INSERT INTO disciplina (name, docente, sigla, apelido)
//    VALUES ('calculo', 'zara', 'MAT0123, 'calcpi');	//    VALUES ('calculo', 'zara', 'MAT0123, 'calcpi');
//DROP TABLE IF EXISTS atividade;	//DROP TABLE IF EXISTS atividade;
//CREATE TABLE atividade(	//CREATE TABLE atividade(
//    id SERIAL PRIMARY KEY,	//    id SERIAL PRIMARY KEY,
//    name VARCHAR(50),	//    name VARCHAR(50),
//    descricao VARCHAR(50),	//    descricao VARCHAR(50),
//    tipo VARCHAR(10),	//    tipo VARCHAR(10),
//    concluido BOOLEAN DEFAULT FALSE	//    concluido BOOLEAN DEFAULT FALSE,
//    prazo DATE
//);	//);
//INSERT INTO atividade (name, descricao, tipo)	//INSERT INTO atividade (name, descricao, tipo, prazo)
//    VALUES ('projeto iridium', 'entregar segunda', 'Prova');	//    VALUES ('projeto iridium', 'entregar segunda', 'Prova', '2024-07-14');
//INSERT INTO atividade (name, descricao, tipo, concluido)	//INSERT INTO atividade (name, descricao, tipo, concluido, prazo)
//    VALUES ('lista', 'exercicio 2', 'Tarefa', TRUE);	//    VALUES ('lista', 'exercicio 2', 'Tarefa', TRUE, '2025-04-20');


fun Application.configureDatabases() {
    Database.connect(
        "jdbc:postgresql://localhost:5432/iridium_db",
//        driver = "org.postgresql.Driver",
        user = "postgres",  
        //password = "bancodados"
        password = "Bibi2004!"
        )
}
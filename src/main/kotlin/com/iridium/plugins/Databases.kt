package com.iridium.plugins

import io.ktor.server.application.*
import org.jetbrains.exposed.sql.*

//DROP TABLE IF EXISTS disciplina;
//CREATE TABLE disciplina(id SERIAL PRIMARY KEY, name VARCHAR(50), docente VARCHAR(50), sigla VARCHAR(50), apelido VARCHAR(50));
//INSERT INTO disciplina (name, docente, sigla, apelido) VALUES ('calculo', 'zara', 'MAT0123, 'calcpi');
//
//DROP TABLE IF EXISTS atividade;
//CREATE TABLE atividade(id SERIAL PRIMARY KEY, name VARCHAR(50), descricao VARCHAR(50), tipo VARCHAR(10));
//INSERT INTO atividade (name, descricao, tipo) VALUES ('projeto iridium', 'entregar segunda', 'Prova');

fun Application.configureDatabases() {
    Database.connect(
        "jdbc:postgresql://localhost:5432/iridium_db",
//        driver = "org.postgresql.Driver",
        user = "postgres",  
        password = "bancodados"
    )
}
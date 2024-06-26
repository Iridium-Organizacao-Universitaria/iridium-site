package com.iridium.plugins

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.sql.*
import kotlinx.coroutines.*
import org.jetbrains.exposed.sql.*

//DROP TABLE IF EXISTS disciplina;
//CREATE TABLE disciplina(id SERIAL PRIMARY KEY, name VARCHAR(50), docente VARCHAR(50));
//INSERT INTO disciplina (name, docente) VALUES ('calculo', 'zara');

fun Application.configureDatabases() {
    Database.connect(
        "jdbc:postgresql://localhost:5432/iridium_db",
//        driver = "org.postgresql.Driver",
        user = "postgres",  
        password = "bancodados"
    )
}
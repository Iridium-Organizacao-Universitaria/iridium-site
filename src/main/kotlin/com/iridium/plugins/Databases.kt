package com.iridium.plugins

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.sql.*
import kotlinx.coroutines.*
import org.jetbrains.exposed.sql.*

fun Application.configureDatabases() {
    Database.connect(
        "jdbc:postgresql://localhost:5432/ktor_tutorial_db",
        driver = "org.postgresql.Driver",
        user = "postgres",  
        password = "bancodados"
    )
}
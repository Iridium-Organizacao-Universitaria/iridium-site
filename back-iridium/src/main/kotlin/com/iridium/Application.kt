package com.iridium

import com.iridium.models.PostgresAtividadeRepository
import com.iridium.models.PostgresDisciplinaRepository
import com.iridium.plugins.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*

fun Application.module() {
    install(ContentNegotiation) {
        json()
    }
    val disciplinaRepository = PostgresDisciplinaRepository()
    val atividadeRepository = PostgresAtividadeRepository()

    configureDisciplinaSerialization(disciplinaRepository)
    configureAtividadeSerialization(atividadeRepository)
    configureRouting()
    configureDatabases()
    configureHTTP()
//    configureMonitoring() // n sei oq eh nao tava no tutorial
}
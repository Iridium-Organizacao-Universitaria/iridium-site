package com.iridium

import com.iridium.models.PostgresAtividadeRepository
import com.iridium.models.PostgresDisciplinaRepository
import com.iridium.plugins.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty

/*
fun main() {
    embeddedServer(Netty, port = 9027) {  // Mude para a mesma porta no arquivo de configuração
        module()
    }.start(wait = true)
}
 */

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
//    configureMonitoring() // n sei oq eh nao tava no tutorial
}
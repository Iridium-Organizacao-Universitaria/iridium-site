package com.iridium

import com.iridium.models.PostgresDisciplinaRepository
import com.iridium.plugins.*
import io.ktor.server.application.*

//fun main() {
//    embeddedServer(Netty, port = 8080, host = "0.0.0.0", module = Application::module)
//        .start(wait = true)
//}

fun Application.module() {
    val repository = PostgresDisciplinaRepository()

    configureSerialization(repository)
    configureRouting()
    configureDatabases()
//    configureMonitoring() // n sei oq eh nao tava no tutorial
}
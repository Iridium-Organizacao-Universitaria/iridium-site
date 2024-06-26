package com.iridium

import com.iridium.models.PostgresDisciplinaRepository
import com.iridium.plugins.*
import io.ktor.server.application.*

fun Application.module() {
    val repository = PostgresDisciplinaRepository()

    configureSerialization(repository)
    configureRouting()
    configureDatabases()
//    configureMonitoring() // n sei oq eh nao tava no tutorial
}
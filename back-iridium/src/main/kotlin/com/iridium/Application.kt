package com.iridium

import com.iridium.models.PostgresAtividadeRepository
import com.iridium.models.PostgresDisciplinaRepository
import com.iridium.plugins.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import kotlinx.serialization.json.Json
import kotlinx.serialization.modules.SerializersModule
import java.time.LocalDate

fun Application.module() {
    install(ContentNegotiation) {
        json()	        json(Json {
            serializersModule = SerializersModule {
                contextual(LocalDate::class, LocalDateSerializer)
            }
            ignoreUnknownKeys = true
        })
    }	    }
    val disciplinaRepository = PostgresDisciplinaRepository()
    val atividadeRepository = PostgresAtividadeRepository()

    configureDisciplinaSerialization(disciplinaRepository)
    configureAtividadeSerialization(atividadeRepository)
    configureRouting()
    configureDatabases()
    configureHTTP()
//    configureMonitoring() // n sei oq eh nao tava no tutorial
}
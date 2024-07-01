package com.iridium

import com.iridium.models.PostgresAtividadeRepository
import com.iridium.models.PostgresDisciplinaRepository
import com.iridium.models.PostgresUsuarioRepository
import com.iridium.plugins.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import kotlinx.serialization.json.Json
import kotlinx.serialization.modules.SerializersModule
import java.time.LocalDate

fun Application.module() {
    install(ContentNegotiation) {
        json(Json {
            serializersModule = SerializersModule {
                contextual(LocalDate::class, LocalDateSerializer)
            }
            ignoreUnknownKeys = true
        })
    }
    val disciplinaRepository = PostgresDisciplinaRepository()
    val atividadeRepository = PostgresAtividadeRepository()
    val usuarioRepository = PostgresUsuarioRepository()

    configureDisciplinaSerialization(disciplinaRepository)
    configureAtividadeSerialization(atividadeRepository)
    configureUsuarioSerialization(usuarioRepository)
    configureRouting()
    configureDatabases()
    configureMonitoring() // n sei oq eh nao tava no tutorial
}
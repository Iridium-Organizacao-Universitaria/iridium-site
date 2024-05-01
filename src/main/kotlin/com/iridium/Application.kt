package com.iridium

import com.iridium.plugins.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {
//    install(ContentNegotiation)
    configureRouting()
    configureSerialization()
}
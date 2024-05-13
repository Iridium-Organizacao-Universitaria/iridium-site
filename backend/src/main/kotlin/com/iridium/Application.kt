package com.iridium

import com.iridium.plugins.*
import io.ktor.server.application.*
import io.ktor.server.plugins.cors.routing.*

/*
fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}
 */

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0", module = Application::module)
        .start(wait = true)
}

fun Application.module() {
    install(CORS) {
        anyHost()
    }
    configureHTTP()
    configureSerialization()
    configureDatabases()
    configureMonitoring()
    configureRouting()
}

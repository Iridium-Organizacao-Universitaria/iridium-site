package com.iridium

import com.iridium.plugins.*
import io.ktor.server.application.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

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
    /*
    como já instalou o plugin, não precisa instalar dnv (erro de pacote duplicado)
    install(CORS) {
        anyHost()
    }
     */
    //configureHTTP()
    configureSerialization()
    //configureDatabases()
    //configureMonitoring()
    configureRouting()
}

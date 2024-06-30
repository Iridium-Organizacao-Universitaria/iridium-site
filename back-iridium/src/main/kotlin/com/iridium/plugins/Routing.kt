package com.iridium.plugins

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

//import com.iridium.routes.*
import io.ktor.http.* // ContentType
import io.ktor.server.http.content.* // staticResources
//import io.ktor.server.plugins.statuspages.*

fun Application.configureRouting() {
    routing {
        staticResources("/", "frontend")

//        get("/") {
//            call.respondText("Iridium - Organização Universitária")
//        }

        // Adiciona uma nova pagina (link.com/test1)
        get("/test1") {
            val text = "<h1>Página de test1</h1>"
            val type = ContentType.parse("text/html")
            call.respondText(text, type)
        }

        // Uma pagina para o plugin Status Pages nao entendi o objetivo
        get("/error-test") {
            throw IllegalStateException("Too Busy")
        }
    }
}
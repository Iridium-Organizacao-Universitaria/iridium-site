package com.iridium.plugins

import com.iridium.routes.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.plugins.statuspages.*

fun Application.configureRouting() {
    install(StatusPages) {
        exception<IllegalStateException> { call, cause ->
            call.respondText("App in illegal state as ${cause.message}")
        }
    }
    routing {
        disciplinaRouting()
        atividadeRouting()

        // Cria paginas da pasta mycontent no endpoint content (link.com/content/sample.html)
        // a pasta mycontent deve estar em src/main/resources
        staticResources("/content", "mycontent")

        get("/") {
            call.respondText("Iridium - Organização Universitária")
        }

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

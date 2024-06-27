package com.iridium.plugins

import io.ktor.http.*
import io.ktor.serialization.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.request.*

fun Application.configureSerialization(repository: DisciplinaRepository) {
    install(ContentNegotiation) {
        json()
    }
    routing {
        route("/disciplinas") {
            get {
                val disciplinas = repository.allDisciplinas()
                call.respond(disciplinas)
            }

            get("/byName/{disciplinaName}") {
                val nome = call.parameters["disciplinaName"]
                if (nome == null) {
                    call.respond(HttpStatusCode.BadRequest)
                    return@get
                }
                val disciplina = repository.disciplinaByName(nome)
                if (disciplina == null) {
                    call.respond(HttpStatusCode.NotFound)
                    return@get
                }
                call.respond(disciplina)
            }

            post {
                try {
                    val disciplina = call.receive<Disciplina>()
                    repository.addDisciplina(disciplina)
                    call.respond(HttpStatusCode.NoContent)
                } catch (ex: IllegalStateException) {
                    call.respond(HttpStatusCode.BadRequest)
                } catch (ex: JsonConvertException) {
                    call.respond(HttpStatusCode.BadRequest)
                }
            }

            delete("/{disciplinaName}") {
                val nome = call.parameters["disciplinaName"]
                if (nome == null) {
                    call.respond(HttpStatusCode.BadRequest)
                    return@delete
                }
                if (repository.removeDisciplina(nome)) {
                    call.respond(HttpStatusCode.NoContent)
                } else {
                    call.respond(HttpStatusCode.NotFound)
                }
            }
        }
    }
}
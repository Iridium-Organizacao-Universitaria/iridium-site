package com.iridium.plugins

import Disciplina
import Atividade
import com.iridium.models.DisciplinaRepository
import com.iridium.models.AtividadeRepository
import io.ktor.http.*
import io.ktor.serialization.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.request.*

fun Application.configureDisciplinaSerialization(repository: DisciplinaRepository) {
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

fun Application.configureAtividadeSerialization(repository: AtividadeRepository) {
    routing {
        route("/atividades") {
            get {
                val atividades = repository.allAtividades()
                call.respond(atividades)
            }

            get("/byName/{atividadeName}") {
                val nome = call.parameters["atividadeName"]
                if (nome == null) {
                    call.respond(HttpStatusCode.BadRequest)
                    return@get
                }
                val atividade = repository.atividadeByName(nome)
                if (atividade == null) {
                    call.respond(HttpStatusCode.NotFound)
                    return@get
                }
                call.respond(atividade)
            }

            get("/byTipo/{tipo}") {
                val tipoAsText = call.parameters["tipo"]
                if (tipoAsText == null) {
                    call.respond(HttpStatusCode.BadRequest)
                    return@get
                }
                try {
                    val tipo = Tipo.valueOf(tipoAsText)
                    val atividades = repository.atividadesByTipo(tipo)


                    if (atividades.isEmpty()) {
                        call.respond(HttpStatusCode.NotFound)
                        return@get
                    }
                    call.respond(atividades)
                } catch (ex: IllegalArgumentException) {
                    call.respond(HttpStatusCode.BadRequest)
                }
            }

            get("/byConcluido/{concluido}") {
                val concluidoAsBoolean = call.parameters["concluido"]
                if (concluidoAsBoolean == null) {
                    call.respond(HttpStatusCode.BadRequest)
                    return@get
                }
                try {
                    val concluido = concluidoAsBoolean?.toBoolean()?: false
                    val atividades = repository.atividadesByConcluido(concluido)


                    if (atividades.isEmpty()) {
                        call.respond(HttpStatusCode.NotFound)
                        return@get
                    }
                    call.respond(atividades)
                } catch (ex: IllegalArgumentException) {
                    call.respond(HttpStatusCode.BadRequest)
                }
            }

            post {
                try {
                    val atividade = call.receive<Atividade>()
                    repository.addAtividade(atividade)
                    call.respond(HttpStatusCode.NoContent)
                } catch (ex: IllegalStateException) {
                    call.respond(HttpStatusCode.BadRequest)
                } catch (ex: JsonConvertException) {
                    call.respond(HttpStatusCode.BadRequest)
                }
            }

            delete("/{atividadeName}") {
                val nome = call.parameters["atividadeName"]
                if (nome == null) {
                    call.respond(HttpStatusCode.BadRequest)
                    return@delete
                }
                if (repository.removeAtividade(nome)) {
                    call.respond(HttpStatusCode.NoContent)
                } else {
                    call.respond(HttpStatusCode.NotFound)
                }
            }
        }
    }
}
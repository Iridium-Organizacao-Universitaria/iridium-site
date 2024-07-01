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
import kotlinx.serialization.*
import kotlinx.serialization.descriptors.*
import kotlinx.serialization.encoding.*
import java.time.LocalDate
import java.time.format.DateTimeFormatter

object LocalDateSerializer : KSerializer<LocalDate> {
    private val formatter: DateTimeFormatter = DateTimeFormatter.ISO_LOCAL_DATE

    override val descriptor: SerialDescriptor = PrimitiveSerialDescriptor("LocalDate", PrimitiveKind.STRING)

    override fun serialize(encoder: Encoder, value: LocalDate) {
        encoder.encodeString(value.format(formatter))
    }

    override fun deserialize(decoder: Decoder): LocalDate {
        return LocalDate.parse(decoder.decodeString(), formatter)
    }
}

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

            get("/byAndamento/{andamento}") {
                val andamentoAsBoolean = call.parameters["andamento"]
                if (andamentoAsBoolean == null) {
                    call.respond(HttpStatusCode.BadRequest)
                    return@get
                }
                try {
                    // tava dando warning
                    //val andamento = andamentoAsBoolean?.toBoolean()?: false
                    val andamento = andamentoAsBoolean.toBoolean()
                    val atividades = repository.disciplinasByAndamento(andamento)


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

            // Andamento
            put("/andamento/{disciplinaName}") {
                val nome = call.parameters["disciplinaName"]
                if (nome == null) {
                    call.respond(HttpStatusCode.BadRequest)
                    return@put
                }

                val request = try {
                    call.receive<Map<String, Boolean>>() // Recebe o corpo como um mapa de parâmetros
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.BadRequest, "Parâmetro 'andamento' ausente ou inválido")
                    return@put
                }

                val andamento = request["andamento"]
                if (andamento == null) {
                    call.respond(HttpStatusCode.BadRequest, "Parâmetro 'andamento' ausente ou inválido")
                    return@put
                }

                if (repository.switchDisciplinaAndamento(nome, andamento)) {
                    call.respond(HttpStatusCode.NoContent)
                } else {
                    call.respond(HttpStatusCode.NotFound)
                }
            }

            // Sigla
            put("/sigla/{disciplinaName}") {
                val nome = call.parameters["disciplinaName"]
                if (nome == null) {
                    call.respond(HttpStatusCode.BadRequest)
                    return@put
                }

                val request = try {
                    call.receive<Map<String, String>>() // Recebe o corpo como um mapa de parâmetros
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.BadRequest, "Parâmetro 'sigla' ausente ou inválido")
                    return@put
                }

                val sigla = request["sigla"]
                if (sigla == null) {
                    call.respond(HttpStatusCode.BadRequest, "Parâmetro 'sigla' ausente ou inválido")
                    return@put
                }

                if (repository.switchDisciplinaSigla(nome, sigla)) {
                    call.respond(HttpStatusCode.NoContent)
                } else {
                    call.respond(HttpStatusCode.NotFound)
                }
            }


            // Docente
            put("/docente/{disciplinaName}") {
                val nome = call.parameters["disciplinaName"]
                if (nome == null) {
                    call.respond(HttpStatusCode.BadRequest)
                    return@put
                }

                val request = try {
                    call.receive<Map<String, String>>() // Recebe o corpo como um mapa de parâmetros
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.BadRequest, "Parâmetro 'docente' ausente ou inválido")
                    return@put
                }

                val docente = request["docente"]
                if (docente == null) {
                    call.respond(HttpStatusCode.BadRequest, "Parâmetro 'docente' ausente ou inválido")
                    return@put
                }

                if (repository.switchDisciplinaDocente(nome, docente)) {
                    call.respond(HttpStatusCode.NoContent)
                } else {
                    call.respond(HttpStatusCode.NotFound)
                }
            }

            // Apelido
            put("/apelido/{disciplinaName}") {
                val nome = call.parameters["disciplinaName"]
                if (nome == null) {
                    call.respond(HttpStatusCode.BadRequest)
                    return@put
                }

                val request = try {
                    call.receive<Map<String, String>>() // Recebe o corpo como um mapa de parâmetros
                } catch (e: Exception) {
                    call.respond(HttpStatusCode.BadRequest, "Parâmetro 'apelido' ausente ou inválido")
                    return@put
                }

                val apelido = request["apelido"]
                if (apelido == null) {
                    call.respond(HttpStatusCode.BadRequest, "Parâmetro 'apelido' ausente ou inválido")
                    return@put
                }

                if (repository.switchDisciplinaApelido(nome, apelido)) {
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

            put("/switchConcluido/{atividadeName}/{disciplinaName}") {
                val nome = call.parameters["atividadeName"]
                val disciplina = call.parameters["disciplinaName"]
                if (nome == null || disciplina == null) {
                    call.respond(HttpStatusCode.BadRequest)
                    return@put
                }
                if (repository.switchAtividadeConcluido(nome, disciplina)) {
                    call.respond(HttpStatusCode.NoContent)
                } else {
                    call.respond(HttpStatusCode.NotFound)
                }
            }
        }
    }
}
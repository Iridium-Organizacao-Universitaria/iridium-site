package com.iridium.models

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import kotlinx.serialization.Serializable
import kotlin.reflect.jvm.internal.impl.types.TypeCheckerState.SupertypesPolicy.None
import java.util.UUID// para id random
import com.iridium.responses.DisciplinaResponse

//@Serializable
//data class Disciplina(
class Disciplina(
    val id: UUID = UUID.randomUUID(),
    val nome: String,
    val sigla: String,
    val docente: String,
    val apelido: String,
    val emAndamento: Boolean
)
//To not complicate the code we'll be using an in-memory storage (i.e. a mutable list of Customers)
// – in a real application, we would be storing this information in a database so that it doesn't
// get lost after restarting our application.
//val disciplinaStorage = mutableListOf<Disciplina>()

//fun getDisciplinaBySigla(siglaDisciplina: String): Disciplina {
//    val disciplina: Disciplina = disciplinaStorage.find { it.sigla == siglaDisciplina } ?: throw Exception("nao existe essa disciplina")
//    return disciplina
//}

fun Disciplina.toDisciplinaResponse(): DisciplinaResponse {
    return DisciplinaResponse(
        id = id.toString(),
        nome = nome,
        sigla = sigla,
        docente = docente,
        apelido = apelido,
        emAndamento = emAndamento.toString()
    )
}
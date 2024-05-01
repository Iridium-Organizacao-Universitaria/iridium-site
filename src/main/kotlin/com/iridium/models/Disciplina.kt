package com.iridium.models

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import kotlinx.serialization.Serializable
import kotlin.reflect.jvm.internal.impl.types.TypeCheckerState.SupertypesPolicy.None

@Serializable
data class Disciplina(
    var nome: String,
    var sigla: String,
    var docente: String,
    var apelido: String
)
//To not complicate the code we'll be using an in-memory storage (i.e. a mutable list of Customers)
// – in a real application, we would be storing this information in a database so that it doesn't
// get lost after restarting our application.
val disciplinaStorage = mutableListOf<Disciplina>()

fun getDisciplinaBySigla(siglaDisciplina: String): Disciplina {
    val disciplina: Disciplina = disciplinaStorage.find { it.sigla == siglaDisciplina } ?: throw Exception("nao existe essa disciplina")
    return disciplina
}
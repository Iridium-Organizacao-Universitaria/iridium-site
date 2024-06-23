//package com.iridium.models

import kotlinx.serialization.Serializable

//To not complicate the code we'll be using an in-memory storage (i.e. a mutable list of Customers)
@Serializable
data class Disciplina(
    var name: String,
//    var sigla: String,
    var docente: String,
//    var apelido: String
)
// – in a real application, we would be storing this information in a database so that it doesn't
// get lost after restarting our application.
//val disciplinaStorage = mutableListOf<Disciplina>()
//
//fun getDisciplinaBySigla(siglaDisciplina: String): Disciplina {
//    val disciplina: Disciplina = disciplinaStorage.find { it.sigla == siglaDisciplina } ?: throw Exception("nao existe essa disciplina")
//    return disciplina
//}
//
//object Disciplinas:Table(){
//    var nome = varchar("nome", 255)
//    var sigla = varchar("sigla", 10)
//    var docente = varchar("docente", 255)
//    var apelido = varchar("apelido", 255)
//
//    override val primaryKey: PrimaryKey
//        get() = PrimaryKey(sigla)
//}
package com.iridium.models

import kotlinx.serialization.Serializable
import com.iridium.routes.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.ReferenceOption
import Disciplina

enum class Tipo {
    Tarefa, Prova
}

@Serializable
data class Atividade(
    var nome: String,
    var tipoTag: Tipo,
//    var prazo: String,
//    var descricao: String,
//    var id: String,
    var disciplina: Disciplina,
//    var concluido: Boolean = false
)

//) {
//    constructor(nome: String, tipoTag: String, prazo: String, descricao: String, id: String, sigladisciplina: String) :
//            this(nome, tipoTag, prazo, descricao, id, getDisciplinaBySigla(sigladisciplina))
//
//    fun flipConcluido() {
//        this.concluido = !this.concluido;
//    }
//}

//To not complicate the code we'll be using an in-memory storage (i.e. a mutable list of Customers)
// – in a real application, we would be storing this information in a database so that it doesn't
// get lost after restarting our application.
val atividadeStorage = mutableListOf<Atividade>()
//
//object Atividades:Table(){
//    var nome = varchar("nome", 255)
//    var tipoTag = varchar("tipoTag", 10)
//    var prazo = varchar("prazo", 10)
//    var id = integer("id").autoIncrement()
//    val sigladisciplina = varchar("siglaDisciplina", 10).references(Disciplinas.sigla,ReferenceOption.CASCADE)
//    var concluido = bool("concluido")
//
//    override val primaryKey: PrimaryKey
//        get() = PrimaryKey(id)
//}
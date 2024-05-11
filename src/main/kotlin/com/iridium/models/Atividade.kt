package com.iridium.models

import kotlinx.serialization.Serializable
import com.iridium.routes.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*

@Serializable
data class Atividade(
    var nome: String,
    var tipoTag: String,
    var prazo: String,
    var descricao: String,
    var id: String,
    var disciplina: Disciplina,
    var concluido: Boolean = false

) {
    constructor(nome: String, tipoTag: String, prazo: String, descricao: String, id: String, sigladisciplina: String) :
            this(nome, tipoTag, prazo, descricao, id, getDisciplinaBySigla(sigladisciplina))

    fun flipConcluido() {
        this.concluido = !this.concluido;
    }
}

//To not complicate the code we'll be using an in-memory storage (i.e. a mutable list of Customers)
// – in a real application, we would be storing this information in a database so that it doesn't
// get lost after restarting our application.
val atividadeStorage = mutableListOf<Atividade>()
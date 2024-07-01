package com.iridium.models

import Tipo
import Atividade
import java.time.LocalDate
import java.sql.Date

interface AtividadeRepository {
    suspend fun allAtividades(): List<Atividade>
    suspend fun atividadesByTipo(tipo: Tipo): List<Atividade>
    suspend fun atividadesByConcluido(concluido: Boolean): List<Atividade>
    suspend fun atividadeByName(name: String): Atividade?
    suspend fun addAtividade(atividade: Atividade)
    suspend fun removeAtividade(name: String): Boolean

    // tentativa bd
//    suspend fun switchAtividadePrazo(name: String, prazo: Date) : Boolean
    suspend fun switchAtividadeTipo(name: String, tipo: String) : Boolean
    suspend fun switchAtividadeDescricao(name: String, descricao: String) : Boolean
    suspend fun switchAtividadeDisciplina(name: String, disciplina: String) : Boolean
    suspend fun switchAtividadeName(name: String, newName: String) : Boolean
    suspend fun switchAtividadeConcluido(name: String, concluido: Boolean): Boolean

}
